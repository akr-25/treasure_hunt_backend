import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/game",
    name: "Game",
    component: () => import("../views/Game.vue"),
  },
  {
    path: "/final",
    name: "Final",
    component: () => import("../views/Final.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
