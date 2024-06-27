import { createWebHashHistory, createRouter } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import ItemsPage from "./pages/Items.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/items",
    name: "Items",
    component: ItemsPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
