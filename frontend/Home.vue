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
    <div class="row">
      <div class="col-12 col-md-6 mt-4">
        <h4 class="mt-3"><b>Details</b></h4>
        <form class="mt-4" @submit.prevent="startGame">
          <div class="form-group">
            <label for="exampleInputFullName">Full Name</label>
            <input
              type="fullName"
              class="form-control"
              id="exampleInputFullName"
              placeholder="Full Name"
              :value="displayName"
              required
              :v-model="displayName"
              @input="displayName = $event.target.value"
              :disabled="getFullName"
            />
            {{ fullName }}
          </div>
          <div class="form-group mt-4">
            <label for="exampleInputEmail">Email Address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail"
              disabled
              :value="email"
              :v-model="email"
            />
          </div>
          <button
            type="submit"
            :disabled="btnDisabled"
            class="btn btn-success mt-4"
          >
            <span
              v-if="spinning"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>

            <span v-if="spinning" class="sr-only">&nbsp; Loading...</span>
            <span v-else class="sr-only">Submit & Start Game</span>
          </button>
        </form>
      </div>
      <div class="col-12 col-md-6 mt-4">
        <h4 class="mt-3"><b>Rules</b></h4>
        <div class="card py-5 px-2 mb-3 mt-4">
          <ul>
            <li>The treasure hunt starts at 11 am till 7 pm.</li>
            <br />
            <li>
              The one who solves the last clue first will be the winner of the
              treasure hunt. He/she may also have to explain the solving of the
              rest of the clues later.
            </li>
            <br />
            <li>
              If more than one person solves the final answer, then the winner
              will be the one who solves the answer first.
            </li>
            <br />
            <li>
              If no one solves the entire treasure hunt, the current progress of
              each participant will be considered for evaluation.
            </li>
            <br />
            <li>
              All answers must be in small letters with no space or special
              characters.<br />
              For example: If the answer is WhatsApp Messenger, type in
              whatsappmessenger.
            </li>
            <br />
            <li>
              Enter the full name of any person.<br />
              For example: If the answer is Neil Alden Armstrong, type in
              neilaldenarmstrong.
            </li>
            <br />
            <li>
              Enter the full name of any organization/product.<br />
              For example: If the answer is Meet, type in googlemeet.
            </li>
            <br />
            <li>
              Hints for every level will be posted on the Official
              <a href="https://instagram.com/ieeeajcesb"><b>Instagram</b></a>
              Page.
            </li>
            <br />
            <li>
              The decision of the organizing committee is final and binding.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      uId: null,
      user: null,
      fullName: null,
      email: null,
      details: null,
      displayName: null,
      getFullName: false,
      btnDisabled: false,
      isLoading: true,
      spinning: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.uId = user.uid;
        this.displayName = user.displayName;
        this.email = user.email;
        this.checkUser();
      } else {
        this.user = null;
      }
    });
  },
  methods: {
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
          if (res.data.result != null) {
            this.$router.push("/game");
          } else {
            this.isLoading = false;
            this.$router.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async startGame() {
      this.spinning = true;
      const userData = {
        uId: this.uId,
        fullName: this.displayName,
        email: this.email,
      };
      const token = await firebase.auth().currentUser.getIdToken();
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .post("http://localhost:5000/users", userData, config)
        .then((res) => {
          if (res.data.result == null) {
            alert("User already exist");
            this.$router.push("/game");
          } else {
            alert("Successfully Registered!");
            this.$router.push("/game");
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
a {
  color: white;
  text-decoration: none;
}
a:active {
  color: black;
}
a:focus {
  color: black;
}
</style>
