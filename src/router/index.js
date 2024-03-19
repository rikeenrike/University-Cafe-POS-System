import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/cashier/menu/drinks",
  },
  {
    path: "/cashier",
    component: () => import("/src/pages/cashier/cashier.vue"),
    redirect: "/cashier/menu/drinks", // This is now an absolute path
    children: [
      {
        path: "menu/foods",
        name: "Foods",
        component: () => import("/src/pages/cashier/cashier_menu_foods.vue"),
      },
      {
        path: "menu/drinks",
        name: "Drinks",
        component: () => import("/src/pages/cashier/cashier_menu_drinks.vue"),
      },
    ],
  },
  {
    path: "/kitchen",
    name: "Kitchen",
    component: () => import("/src/pages/kitchen/kitchen.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.NODE_ENV === "production" ? "/" : "",
  routes,
});

export default router;