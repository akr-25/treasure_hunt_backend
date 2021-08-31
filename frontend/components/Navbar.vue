<template>
  <nav class="navbar navbar-light sticky-top" style="background-color: #f59800">
    <h2 class="navbar-brand px-3"><b>Treasure Hunt</b></h2>
    <!-- <button class="btn btn-danger mx-auto" @click="Logout">Logout</button> -->
    <a class="btn btn-danger px-3 mx-4" @click="Logout">Logout</a>
  </nav>
</template>

<script>
import firebase from "firebase";
import { useRouter } from "vue-router";
export default {
  name: "navbar",
  setup() {
    const router = useRouter();
    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.replace("/signup");
          console.log("Signed Out");
        })
        .catch((err) => alert(err.message));
    };
    return {
      Logout,
    };
  },
};
</script>

<style></style>
