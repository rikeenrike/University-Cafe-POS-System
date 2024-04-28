import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios';

const routes = [
  {
    name: "Login",
    path: "/",
    component: () => import("/src/pages/login/login.vue"),
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
    component: () => import("/src/pages/kitchen/kitchen.vue"),
    meta: {
      requiresAuth: true,
    },
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
    component: () => import("/src/pages/reports/reports.vue"),
    meta: {
      requiresAuth: true,
    },
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
