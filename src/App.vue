<script setup>
import { ref, onMounted } from 'vue'
import { fetchFoodsProducts, fetchDrinksProducts, fetchproducts } from './pages/cashier/scripts/fetchProducts.js'
import navigation from "./pages/navigation/navigation.vue";

import { useRoute } from 'vue-router';
const route = useRoute();
onMounted(() => {
  fetchFoodsProducts()
  fetchDrinksProducts()
  fetchproducts()
})
</script>

<template>
  <navigation v-if="$route.name !== 'Login' && $route.name !== 'NotFound'"/>  
  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col items-center p-5 bg-white font-sora rounded-md">
        <div
          class="rounded-full bg-primary-500 dark:bg-primary-400 text-surface-0 dark:text-surface-900 inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-[3rem]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-24 h-24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
        <p class="mb-0 text-center">{{ message.message }}</p>
        <div class="flex items-center gap-2 mt-4">
          <Button label="Confirm" @click="acceptCallback" class="bg-primary"></Button>
          <Button label="Cancel" outlined @click="rejectCallback"></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
  <Toast position="top-right" group="bc" class="z-9999"></Toast>
  <router-view />
</template>