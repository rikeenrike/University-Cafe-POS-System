<script setup>
import basket from "./cashier_basket.vue";
import { ref, computed } from "vue";
import { addToCart } from "./scripts/Transaction.js";
import { productdata } from "./scripts/fetchProducts.js";
import { ongoingOrders, readyOrders , loading, fetchsuccess } from "../kitchen/assets/fetchTransactions";
import statusloading from "../loading-comps/statusloading.vue";

const search = ref("");
const filteredResults = ref([]);
const filteredData = computed(() => {
  if (!search.value) {
    return productdata.value;
  }

  return filteredResults.value;
});
const filterData = () => {
  if (!productdata.value) {
    isloading.value = false;
    return;
  }
  filteredResults.value = productdata.value.filter(item =>
    item.ProductName.toLowerCase().includes(search.value.toLowerCase())
  );
};

</script>

<template>
  <div
    class="px-5 relative md:px-[43px] lg:grid lg:grid-cols-[2fr,2fr] xl:grid-cols-[2fr,.8fr] font-sora select-none top-[80px] h-[calc(100vh-80px)] ">
    <div v-if="loading" class="fixed z-20 -top-[1px] w-full">
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
    </div>
    <!-- left wing -->
    <div class="flex flex-col overflow-hidden">
      <!-- status -->
      <div class="flex pr-[20px] h-[151px] gap-2">
        <!-- Ready Section -->
        <div class="w-full xl:flex xl:w-1/2 flex-col justify-evenly">
          <h1 class="text-[32px] text-black font-bold">Ready</h1>
          <div v-if="loading">
            <statusloading />
          </div>
          <div v-if="readyOrders.length" class="flex flex-row whitespace-nowrap gap-5 overflow-x-scroll overflow-auto">
            <div v-for="ready in readyOrders" :key="ready.TransID"
              class="p-3 w-[256px] h-[99px] bg-accent rounded-[15px] text-offwhite ">
              <p v-if="ready.Alias !== null" class="text-[24px] font-bold">{{ ready.Alias }}</p>
              <p v-else class="text-[24px] font-bold">{{ ready.FirstName + ' ' + ready.LastName }}</p>
              <p class="text-[16px] font-light">Order#{{ ready.TransID }}</p>
              <p class="text-[12px] font-light">Item/s:test</p>
            </div>
          </div>
          <div v-else>
            <p class="text-lightgrey flex items-center w-[256px] h-[99px]">
              No orders ready...
            </p>
          </div>
        </div>
        <!-- Ongoing Section -->
        <div class="hidden xl:flex w-1/2 flex-col justify-evenly">
          <h1 class="text-[32px] text-black font-bold">Ongoing</h1>
          <div v-if="loading">
            <statusloading />
          </div>
          <div v-if="ongoingOrders.length"
            class="flex flex-row whitespace-nowrap gap-5 overflow-x-scroll overflow-y-hidden">
            <div v-for="ongoing in ongoingOrders" :key="ongoing.TransID"
              class="p-3 w-[256px] h-[99px] bg-secondary rounded-[15px] text-accent">
              <p v-if="ongoing.Alias !== null" class="text-[24px] font-bold">{{ ongoing.Alias }}</p>
              <p v-else class="text-[24px] font-bold">{{ ongoing.FirstName + ' ' + ongoing.LastName }}</p>
              <p class="text-[16px] font-light">Order#{{ ongoing.TransID }}</p>
              <p class="text-[12px] font-light">Item/s:test</p>
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
      <span class="mr-0 lg:mr-5 flex relative ">
        <InputText size="large" v-model="search" placeholder="Search All" @input="filterData" />
      </span>
      <div v-show="search.length === 0">
        <span class="text-lightgrey text-clamp1 font-bold space-x-10">
          <router-link to="/cashier/menu/drinks" active-class="text-black">Drinks</router-link>
          <router-link to="/cashier/menu/foods" active-class="text-black">Foods</router-link>
        </span>
        <!-- menu -->
        <router-view name="foods" />
        <router-view name="drinks" />
      </div>
      <div v-show="search.length > 0">
        <div>
          <h1 class="text-lightgrey text-clamp2 font-bold ">Results</h1>
          <div class=" flex flex-row flex-wrap overflow-x-auto justify-start gap-x-4 gap-y-2 mr-0 lg:mr-5 py-2">
            <div v-if="filteredData.length === 0">
              Item not found
            </div>
            <div v-else v-for="item in filteredData" :key="item.ProductID" @click="addToCart(item)">
              <div class="flex h-full justify-between flex-col items-center relative ">
                <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                  class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center">

                <div
                  class="flex justify-center items-center leading-none py-2  w-[175px] text-clamp4 font-regular text-center text-black ">
                  {{ item.ProductName }}
                </div>
                <div class="text-[12px]  font-semibold text-lightgrey">₱{{ item.UnitPrice }}.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- right wing -->
    <basket />
  </div>
</template>