import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("/src/pages/login/login.vue"),
  },
  {
    path: "/cashier",
    component: () => import("/src/pages/cashier/cashier.vue"),
    redirect: "/cashier/menu/drinks",
    children: [
      {
        path: "menu/foods",
        components: {
          default: () => import("/src/pages/cashier/cashier.vue"),
          foods: () => import("/src/pages/cashier/cashier_menu_foods.vue"),
        },
      },
      {
        path: "menu/drinks",
        components: {
          default: () => import("/src/pages/cashier/cashier.vue"),
          drinks: () => import("/src/pages/cashier/cashier_menu_drinks.vue"),
        },
      },
    ],
  },
  {
    path: "/kitchen",
    name: "Kitchen",
    component: () => import("/src/pages/kitchen/kitchen.vue"),
  },
  {
    path: "/menu-management",
    components: {
      default: () => import("/src/pages/menu-management/menu_management.vue"),
      drinks: () => import("/src/pages/menu-management/menu_management_drinks.vue"),
      foods: () => import("/src/pages/menu-management/menu_management_foods.vue"),
    },
    redirect: "/menu-management/edit/drinks",
    children: [
      {
        path: "edit/drinks",
        components: {
          drinks: () => import("/src/pages/menu-management/menu_management_drinks.vue"),
        },
      },
      {
        path: "edit/foods",
        components: {
          foods: () => import("/src/pages/menu-management/menu_management_foods.vue"),
        },
      },
    ],
  },
  {
    path: "/reports",
    name: "Reports",
    component: () => import("/src/pages/reports/reports.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.NODE_ENV === "production" ? "/" : "",
  routes,
});

export default router;