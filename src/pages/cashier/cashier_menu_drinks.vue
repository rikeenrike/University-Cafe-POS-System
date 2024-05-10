<script setup>
import { addToCart } from "./scripts/Items.js";
import menuloading from "../loading-comps/menuloading.vue";
import { drinksproducts, loading, fetchsuccess } from "./scripts/fetchProducts.js";
</script>

<template>
  <div class=" font-sora select-none relative pr-[0px] lg:pr-[20px] gap-[17px]" style="height: calc(100vh - 400px)">
    <!-- MENU -->
    <div class=" h-full  mt-[1%] overflow-y-auto">
      <!-- loading animation -->
      <div v-if="loading">
        <menuloading />
      </div>
      <div v-if="fetchsuccess">
        <div v-for="tab in drinksproducts" :key="tab.id">
          <Accordion :activeIndex="[0, 1]" :multiple="true">
            <AccordionTab v-if="!tab.isDisabled && tab.items.every(item => !item.isDisabled) && tab.items.length"
              :header="tab.header">
              <div class="-space-x-5 flex overflow-x-auto sm:space-x-1">
                <!-- item -->
                <div v-for="item in tab.items" :key="item.id" @click="addToCart(item)"
                  class="flex items-center cursor-pointer">
                  <div v-if="!item.isDisabled">
                    <div class="flex h-full justify-between flex-col items-center relative ">
                      <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                        class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center">

                      <div
                        class="flex justify-center items-center leading-none py-2  w-[175px] text-clamp4 font-regular text-center text-black ">
                        {{ item.ProductName }}
                      </div>
                      <div class="text-[12px]  font-semibold text-lightgrey">₱{{ item.UnitPrice }}.00
                      </div>
                      <p v-if="item.Stock <= 5" class="text-white flex items-center">
                        <Badge value="Low Stock" class="bg-yellow-500"></Badge>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
      <div v-else class="text-[30px] font-bold text-black text-center">
        <h1>No items found</h1>
        <h2>Please Refresh the Page</h2>
      </div>
    </div>
  </div>
</template>