import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/menu/drinks",
  },
  {
    path: "/menu/foods",
    name: "Foods",
    component: () => import("/src/pages/cashier/menu_foods.vue"),
  },
  {
    path: "/menu/drinks",
    name: "Drinks",
    component: () => import("/src/pages/cashier/menu_drinks.vue"),
  },
  //   {
  //     path: "/orderhistory",
  //     name: "OrderHistory",
  //     component: () =>
  //       import("/src/components/order_history_page/order_history.vue"),
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.NODE_ENV === "production" ? "/" : "",
  routes,
});

export default router;
