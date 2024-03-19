<script setup>
import { ref } from "vue";
import navigation from "./pages/navigation/navigation.vue";
import cashier from "./pages/cashier/cashier.vue";
import kitchen from "./pages/kitchen/kitchen.vue";
</script>

<template>
  <navigation />

  <router-view />
</template>