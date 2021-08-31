<template>
  <div class="signup">
    <div class="container">
      <div class="item m-3">
        <img src="../../public/QuaRunTime.png" alt="icon" />
      </div>
      <div class="item m-3">
        <img src="../../public/TREASUREHUNT.png" alt="icon" />
      </div>
      <div class="item minion m-3">
        <img src="../../public/Minion.png" alt="icon" />
      </div>
      <div class="item">
        <button class="btn mt-3" :disabled="disabled" @click="googleSignIn">
          <span
            v-if="spinning"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>

          <span v-if="spinning" class="sr-only">&nbsp; Loading...</span>
          <span v-else class="sr-only">Sign In With Google</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";

export default {
  data() {
    return {
      uId: null,
      spinning: false,
      user: null,
      disabled: false,
    };
  },
  methods: {
    async googleSignIn() {
      this.spinning = true;
      this.disabled = true;
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          this.user = res.user;
          this.uId = res.user.uid;
          this.spinning = true;
          this.checkUser();
          console.log("signed in!");
        })
        .catch((err) => {
          this.spinning = false;
          this.disabled = false;
          console.log(err);
        });
    },
    async checkUser() {
      const token = await firebase.auth().currentUser.getIdToken();
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
      };

      await axios
        // Replace BACKEND_URL wit the backend url
        .get(`http://localhost:5000/users/${this.uId}`, config)
        .then((res) => {
          this.spinning = false;
          this.disabled = false;
          if (res.data.result != null) {
            this.$router.push("/game");
          } else {
            this.$router.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.container {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 600px;
  justify-content: center;
  align-items: center;
  align-content: center;
}
h1 {
  color: #f59800;
  font-weight: 900;
}
button {
  color: #f59800;
}
img {
  width: 80%;
}

button {
  background-color: #f59800;
  color: black !important;
  font-weight: 600;
}

button:hover {
  background-color: black;
  color: #f59800 !important;
}

.item {
  align-self: center;
}

.minion {
  width: 40% !important;
}

@media (min-width: 840px) {
  img {
    width: 50%;
  }
}
</style>
