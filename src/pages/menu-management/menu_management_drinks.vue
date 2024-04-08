<script setup>
import gsap from "gsap";
import menuloading from "../loading-comps/menuloading.vue";
import { drinksproducts, loading, fetchsuccess } from "../cashier/scripts/fetchProducts.js";

const editItem = () => {

  gsap.to(".edit", {
    x: -10,
    opacity: 1,
    duration: .5,
    ease: "power4.out",
    stagger: 0.2,

  });
  gsap.to(".editwrapper", {
    x: 0,
    opacity: 1,
    duration: .5,
    ease: "power4.out",
    display: "flex",
    backdropFilter: "blur(5px)",
  });
};

const addItem = () => {

    gsap.to(".add", {
      x: -10,
      opacity: 1,
      duration: .5,
      ease: "power4.out",
      stagger: 0.2,

    });
    gsap.to(".addwrapper", {
      x: 0,
      opacity: 1,
      duration: .5,
      ease: "power4.out",
      display: "flex",
      backdropFilter: "blur(5px)",
    });
  
};

</script>

<template>
  <div class="font-sora select-none relative pr-[0px] lg:pr-[20px] gap-[17px] h-[calc(100vh-220px)]">
    <!-- MENU -->
    <div class=" h-full  mt-[1%] overflow-y-auto">
      <!-- loading animation -->
      <div v-if="loading">
        <menuloading />
      </div>
      <div v-if="fetchsuccess">
        <!-- add subcategory button -->
        <div class="h-[100px] border-[3px] mb-1 pl-5 border-offwhite hover:border-primary duration-200 rounded-md flex items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-6 h-6 mr-2 text-lightgrey">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p class="font-bold text-clamp3 text-lightgrey">Add new subcategory</p>
        </div>
        <Accordion :activeIndex="[0, 1]" :multiple="true">
          <AccordionTab v-for="tab in drinksproducts" :key="tab.id" :header="tab.header">
            <div class="-space-x-5 flex overflow-x-auto sm:space-x-1">
              <!-- add item button -->
              <div class="mx-5 flex flex-col items-center" @click="addItem">
                <div
                  class="bg-offwhite w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center cursor-pointer hover:border-primary  duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div
                  class="flex justify-center items-center leading-none py-2  text-clamp4 font-regular text-center text-lightgrey ">
                  Add Item
                </div>
              </div>
              <!-- item -->
              <div v-for="item in tab.items" :key="item.id" @click="editItem" class="flex items-center cursor-pointer">
                <div class="flex h-full justify-between flex-col items-center relative ">
                  <div class="relative group">
                    <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                      class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center group-hover:opacity-50">
                    <div
                      class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span class="text-black text-lg">EDIT</span>
                    </div>
                  </div>
                  <div
                    class="flex justify-center items-center leading-none py-2  w-[175px] text-clamp4 font-regular text-center text-black ">
                    {{ item.ProductName }}
                  </div>
                  <div class="text-[12px]  font-semibold text-lightgrey">₱{{ item.UnitPrice }}.00
                  </div>
                </div>
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
      <div v-else class="text-[30px] font-bold text-black text-center">
        <h1>No items found</h1>
        <h2>Please Refresh the Page</h2>
      </div>
    </div>
  </div>
</template>