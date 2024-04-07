<script setup>
import { ref, onMounted } from 'vue'
import { fetchFoodsProducts, fetchDrinksProducts, fetchproducts } from './pages/cashier/scripts/fetchProducts.js'
import { fetchOrders, fetchLastTransID } from './pages/kitchen/assets/fetchTransactions.js'
import navigation from "./pages/navigation/navigation.vue";

onMounted(() => {
  fetchFoodsProducts()
  fetchDrinksProducts()
  fetchproducts()
  fetchOrders()
  fetchLastTransID()
})
</script>

<template>
  <navigation />
  <ConfirmDialog></ConfirmDialog>
  <Toast position="top-right" group="bc"></Toast>
  <router-view />
</template>