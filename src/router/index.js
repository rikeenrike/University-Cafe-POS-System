import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios';

const routes = [
  {
    name: "Login",
    path: "/",
    component: () => import("/src/pages/login/login.vue"),
  },
  {
    name:"ForgotPassword",
    path: "/forgot-password",
    component: () => import("/src/pages/login/forgotpassword.vue"),
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("/src/pages/sign-up/signup.vue"),
  },
  {
    path: "/cashier",
    component: () => import("/src/pages/cashier/cashier.vue"),
    redirect: "/cashier/menu/drinks",
    meta: {
      requiresAuth: true,
    },
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
    components: {
      default: () => import("/src/pages/kitchen/kitchen.vue"),
      orders: () => import("/src/pages/kitchen/kitchenOrders.vue"),
      cancel: () => import("/src/pages/kitchen/kitchenCancelled.vue"),
    },
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "orders",
        components: {
          orders: () => import("/src/pages/kitchen/kitchenOrders.vue"),
        },
      },
      {
        path: "cancelled-orders",
        components: {
          cancel: () => import("/src/pages/kitchen/kitchenCancelled.vue"),
        },
      },
    ],
  },
  {
    path: "/menu-management",
    components: {
      default: () => import("/src/pages/menu-management/menu_management.vue"),
      drinks: () => import("/src/pages/menu-management/menu_management_drinks.vue"),
      foods: () => import("/src/pages/menu-management/menu_management_foods.vue"),
    },
    meta: {
      requiresAuth: true,
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
    components: {
      default: () => import("/src/pages/reports/reports.vue"),
      sales: () => import("/src/pages/reports/reports_sales.vue"),
      tally: () => import("/src/pages/reports/reports_tally.vue"),
    },
    meta: {
      requiresAuth: true,
    },
    redirect: "/reports/sales",
    children: [
      {
        path: "sales",
        components: {
        sales: () => import("/src/pages/reports/reports_sales.vue"),
        },
      },
      {
        path: "tally",
        components: {
        tally: () => import("/src/pages/reports/reports_tally.vue"),
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('/src/pages/404-page/page404.vue'),
  }
];



const router = createRouter({
  history: createWebHistory(),
  base: process.env.NODE_ENV === "production" ? "/" : "",
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/authenticate', {
        withCredentials: true,
      });
      const data = await response.data;
      if (data) {
        next();
      } else {
        next('/');
      }
    } catch (error) {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
