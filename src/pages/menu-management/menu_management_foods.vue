<script setup>
import menuloading from "../loading-comps/menuloading.vue";
import { foodsproducts, loading, fetchsuccess } from "../cashier/scripts/fetchProducts.js";
import { editItem, addSub, addItem, editSub, } from "./scripts/modifyItems.js";
</script>

<template>
  <div class=" font-sora select-none relative pr-[0px] lg:pr-[20px] gap-[17px] h-[calc(100vh-220px)]">
    <!-- MENU -->
    <div class=" h-full  mt-[1%] overflow-y-auto">
      <!-- loading animation -->
      <div v-if="loading">
        <menuloading />
      </div>
      <div v-if="fetchsuccess">
        <!-- add subcategory button -->
        <div @click="addSub(2)"
          class="h-[100px] border-[3px] mb-1 pl-5 border-offwhite hover:border-primary duration-200 rounded-md flex items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-6 h-6 mr-2 text-lightgrey">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p class="font-bold text-clamp3 text-lightgrey">Add new subcategory</p>
        </div>
        <Accordion :activeIndex="[0, 1]" :multiple="true">
          <AccordionTab v-for="tab in foodsproducts" :key="tab.id" :header="tab.header">
            <template #header>

              <p v-if="tab.isDisabled" class="ml-5 text-primary flex items-center">
                <Badge value="Disabled" class="bg-accent"></Badge>
              </p>

              <svg @click="editSub(tab)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-auto">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </template>
            <div v-if="!tab.isDisabled" class="-space-x-5 flex overflow-x-auto sm:space-x-1">
              <!-- add item button -->
              <div class="mx-5 flex flex-col items-center" @click="addItem(tab)">
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
              <div v-for="item in tab.items" :key="item.id" @click='editItem(item)'
                class="flex items-center cursor-pointer">
                <div v-if="!item.isDisabled" class="flex h-full justify-between flex-col items-center relative ">
                  <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                    class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center">

                  <div
                    class="flex justify-center items-center leading-none py-2  w-[175px] text-clamp4 font-regular text-center text-black ">
                    {{ item.ProductName }}
                  </div>
                  <div class="text-[12px]  font-semibold text-lightgrey">₱{{ item.UnitPrice }}.00
                  </div>
                </div>
                <div v-else class="flex h-full justify-between flex-col items-center relative ">

                  <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                    class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center opacity-50">
                  <div
                    class="flex justify-center items-center leading-none py-2 w-[175px] text-clamp4 font-regular text-center text-black opacity-50">
                    {{ item.ProductName }}
                  </div>
                  <div class="text-[12px]  font-semibold text-lightgrey opacity-50">₱{{ item.UnitPrice }}.00
                  </div>
                  <Badge value="Disabled" class="bg-accent"></Badge>

                </div>
              </div>

            </div>
            <div v-else class="text-center">
              <p class="font-bold text-primary text-clamp4">This is Disabled, Renabled to add item/s again</p>
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