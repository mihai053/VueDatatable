import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Products from "../views/Products.vue";

//we add the routes here
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/products",
      name: "products",
      component: Products,
    },
  ],
});

export default router;
