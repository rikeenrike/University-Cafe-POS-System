<script setup>
import basket from "./cashier_basket.vue";
import { ref } from "vue";
const orderReady = ref([]);
const orderOngoing = ref([]);
const search = ref("");



</script>

<template>
  <div
    class="px-5 relative md:px-[43px] lg:grid lg:grid-cols-[2fr,2fr] xl:grid-cols-[2fr,.8fr] font-sora select-none top-[80px]"
    style="height: calc(100vh - 80px)">
    
    <div class="flex flex-col overflow-hidden">
      <!-- status -->
      <div class="flex pr-[20px] h-[180px] gap-2">
        <!-- Ready Section -->
        <div class="w-full xl:flex xl:w-1/2 flex-col justify-evenly">
          <h1 class="text-[32px] text-black font-bold">Ready</h1>
          <div v-if="orderReady && orderReady.length"
            class="flex flex-row whitespace-nowrap gap-5 overflow-x-scroll overflow-auto">
            <div v-for="order in orderReady" :key="order.id"
              class="p-3 w-[256px] h-[99px] bg-accent rounded-[15px] text-offwhite">
              <p class="text-[24px] font-bold">{{ order.customerName }}</p>
              <p class="text-[16px] font-light">Order#{{ order.orderNumber }}</p>
              <p class="text-[12px] font-light">Item/s: {{ order.items }}</p>
            </div>
          </div>
          <div v-else class="flex flex-row whitespace-nowrap gap-5 overflow-x-scroll  overflow-auto">
            <p class="text-lightgrey flex items-center w-[256px] h-[99px]">
              No orders ready...
            </p>
          </div>
        </div>
        <!-- Ongoing Section -->
        <div class="hidden xl:flex w-1/2 flex-col justify-evenly">
          <h1 class="text-[32px] text-black font-bold">Ongoing</h1>
          <div v-if="orderOngoing && orderOngoing.length"
            class="flex flex-row whitespace-nowrap gap-5 overflow-x-scroll overflow-y-hidden">
            <div v-for="ongoing in orderOngoing" :key="ongoing.id"
              class="p-3 w-[256px] h-[99px] bg-secondary rounded-[15px] text-accent">
              <p class="text-[24px] font-bold">{{ ongoing.customerName }}</p>
              <p class="text-[16px] font-light">Order#{{ ongoing.orderNumber }}</p>
              <p class="text-[12px] font-light">Item/s:{{ ongoing.items }}</p>
            </div>
          </div>
          <div v-else class="flex flex-row whitespace-nowrap gap-5 overflow-x-scroll  overflow-auto">
            <p class="text-lightgrey flex items-center w-[256px] h-[99px]">
              No Ongoing orders...
            </p>
          </div>
        </div>
      </div>
      <!-- search  -->
      <span class="text-lightgrey text-clamp1 font-bold space-x-10">
        <router-link to="/cashier/menu/drinks" active-class="text-black">Drinks</router-link>
        <router-link to="/cashier/menu/foods" active-class="text-black">Foods</router-link>
      </span>

      <span class="mr-0 lg:mr-5 flex relative flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="darkgrey"
          class="w-[30px] h-[30px] absolute top-[20%] left-[.5%] ">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <InputText size="large" v-model="search" placeholder="Search" class="pl-10" />
      </span>
      <!-- menu -->
      <router-view />
    </div>

    <basket />
  </div>
</template>