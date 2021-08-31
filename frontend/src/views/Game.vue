<template>
  <navbar />
  <div class="container">
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
    <div class="row" v-else>
      <div class="col col-lg-6 mx-auto m-5">
        <div class="card p-3">
          <h3 class="pb-3">
            <b
              ><i>Level {{ level }}</i></b
            >
          </h3>
          <img
            :src="image"
            class="mx-auto"
            style="width: 100%"
            :alt="`#${level}`"
          />
          <div class="card-body">
            <p class="card-text">
              {{ question }}
            </p>
            <form class="form-inline" @submit.prevent="verifyAnswer">
              <div class="form-group mb-2">
                <label for="validationServer01" class="sr-only">Answer</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{
                    'is-valid': isAnswerCorrect == true,
                    'is-invalid': isAnswerCorrect == false,
                  }"
                  :readonly="isAnswerCorrect"
                  id="validationServer01"
                  placeholder="Enter your Answer"
                  required
                  v-model="answer"
                />
                <div
                  :class="{
                    'valid-feedback': isAnswerCorrect,
                    'invalid-feedback': !isAnswerCorrect,
                  }"
                >
                  <b>{{ answerComment }}</b>
                </div>
              </div>
              <button
                v-if="!isAnswerCorrect"
                type="submit"
                class="btn mb-2"
                style="background-color: #f59800"
              >
                <span
                  v-if="spinning"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span v-if="spinning" class="sr-only">&nbsp; Verifying...</span>
                <span v-else class="sr-only">Verify Answer</span>
              </button>
              <button v-else @click="checkLevel" class="btn btn-success mb-2">
                Play Next Level
              </button>
            </form>
          </div>
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
      user: null,
      highestLevelPlayed: null,
      level: null,
      question: null,
      image: null,
      answer: null,
      isLoading: true,
      qId: null,
      isAnswerCorrect: null,
      answerComment: null,
      isQuestionFount: null,
      spinning: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uId = user.uid;
        this.checkLevel();
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    async checkLevel() {
      this.isLoading = true;
      this.answerComment = null;
      this.isAnswerCorrect = null;
      this.qId = null;
      this.answer = "";
      this.image = null;
      this.question = null;
      this.level = null;
      this.highestLevelPlayed = null;
      const token = await firebase.auth().currentUser.getIdToken();
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
      };

      await axios
        // Replace BACKEND_URL wit the backend url
        .get(`http://localhost:5000/questions/${this.uId}`, config)
        .then((res) => {
          if (res.data.result.isQuestionFount) {
            this.isQuestionFount = res.data.result.isQuestionFount;
            this.level = res.data.result.result.level;
            this.question = res.data.result.result.question;
            this.image = res.data.result.result.image;
            this.qId = res.data.result.result._id;
            this.isLoading = false;
          } else if (!res.data.result.isQuestionFount) {
            this.$router.replace("/final");
          } else {
            this.$router.replace("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async verifyAnswer() {
      this.spinning = true;
      const token = await firebase.auth().currentUser.getIdToken();
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
      };
      const answer = { answer: this.answer };

      await axios
        // Replace BACKEND_URL wit the backend url
        .post(`http://localhost:5000/answer/${this.qId}/${this.uId}`, answer, config)
        .then((res) => {
          this.spinning = false;
          this.answerComment = res.data.message;
          this.isAnswerCorrect = res.data.result.isAnswerCorrect;
          if (!this.isAnswerCorrect) {
            this.answer = "";
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
h3 {
  text-align: center;
}
</style>
