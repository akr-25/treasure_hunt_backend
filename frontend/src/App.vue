<template>
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import firebase from "firebase";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/signup");
        } else if (route.path == "/signup") {
          router.replace("/");
        }
      });
    });
  },
  mounted() {
    this._addDarkTheme();
  },
  methods: {
    _addDarkTheme() {
      let darkThemeLinkEl = document.createElement("link");
      darkThemeLinkEl.setAttribute("rel", "stylesheet");
      darkThemeLinkEl.setAttribute("href", "/styles.css");
      darkThemeLinkEl.setAttribute("id", "dark-theme-style");

      let docHead = document.querySelector("head");
      docHead.append(darkThemeLinkEl);
    },
    _removeDarkTheme() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      let parentNode = darkThemeLinkEl.parentNode;
      parentNode.removeChild(darkThemeLinkEl);
    },
    darkThemeSwitch() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      if (!darkThemeLinkEl) {
        this._addDarkTheme();
      } else {
        this._removeDarkTheme();
      }
    },
  },
};
</script>

<style lang="scss"></style>
