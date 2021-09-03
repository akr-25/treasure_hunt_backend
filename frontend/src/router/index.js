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
    path: "/new",
    name: "TRYCASE",
    component: () => import("../views/new.vue"),
  },
  {
    path: "/game",
    name: "Game_1",
    component: () => import("../views/Game_1.vue"),
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
