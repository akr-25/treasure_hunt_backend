<template>
  <navbar />
  <div class="m-5 loading" v-if="isLoading">
    <div class="mx-auto" style="width: 50%; text-align: center">
      <img
        src="../../public/minion.gif"
        alt="Loading..."
        width="100"
        height="100"
      />
      <p>Loading...</p>
    </div>
  </div>
  <div class="container" v-else>
    <div class="content">
      <img src="../../public/Minion.png" alt="minion" width="150" />
    </div>
    <div class="content card p-4">
      <p>
        And that's all Folks! <br />
        <br />

        Thank you for participating in QuaRunTime. Hope you have enjoyed the
        event! 🎉
      </p>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => (this.isLoading = false), 1000);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.container {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 600px;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
