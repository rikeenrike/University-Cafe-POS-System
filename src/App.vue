<script setup>
import navigation from "./pages/navigation/navigation.vue";
</script>

<template>
  <navigation />
  <Toast position="top-right" group="bc"></Toast>
  
  <router-view />
</template>