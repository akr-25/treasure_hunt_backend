import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/app";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./registerServiceWorker";

// Replace the firebaseConfig with the credentials from firebase

const firebaseConfig = {
  apiKey: "AIzaSyBeERs_LIJXT4TTCprhZDKHl_jZynbnqSQ",
  authDomain: "treasurehunt-d444d.firebaseapp.com",
  projectId: "treasurehunt-d444d",
  storageBucket: "treasurehunt-d444d.appspot.com",
  messagingSenderId: "763659112948",
  appId: "1:763659112948:web:592e60e59d0d6d224d29a1",
  measurementId: "G-YE13LZC1FN"
};
firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
