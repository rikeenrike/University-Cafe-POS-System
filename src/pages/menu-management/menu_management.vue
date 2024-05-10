<script setup>
import { ref, computed } from "vue";
import { productdata } from "../cashier/scripts/fetchProducts.js";
import popupedit from "../menu-management/popupedit.vue";
import popupadd from "../menu-management/popupadd.vue";
import popupaddsubcategory from "../menu-management/popupaddsubcategory.vue";
import popupeditsubcategory from "../menu-management/popupeditsubcategory.vue";
import { loading } from "../cashier/scripts/fetchProducts.js";
import { editItem } from "./scripts/modifyItems";
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
        return;
    }
    filteredResults.value = productdata.value.filter(item =>
        item.ProductName.toLowerCase().includes(search.value.toLowerCase())
    );
};

</script>



<template>
    <div v-if="loading" class="fixed z-20 -top-[1px] w-full">
        <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
    </div>
    
    <popupeditsubcategory class="fixed z-[999]" />
    <popupedit class="fixed z-[999]" />
    <popupadd class="fixed z-[999]" />
    <popupaddsubcategory class="fixed z-[999]" />


    <div class="px-5 relative md:px-[43px] font-sora select-none top-[80px] h-[calc(100vh-80px)]">

        <div class="flex flex-col overflow-hidden">
            <!-- search  -->
            <span class="mr-0 lg:mr-5 flex relative ">
                <InputText size="large" v-model="search" placeholder="Search All" @input="filterData" />
            </span>
            <div v-show="search.length === 0">
                <span class="text-lightgrey text-clamp1 font-bold space-x-10">
                    <router-link to="/menu-management/edit/drinks" active-class="text-black">Drinks</router-link>
                    <router-link to="/menu-management/edit/foods" active-class="text-black">Foods</router-link>
                </span>
                <!-- menu -->
                <router-view name="drinks" />
                <router-view name="foods" />
            </div>
            <div v-show="search.length > 0">
                <div>
                    <h1 class="text-lightgrey text-clamp2 font-bold ">Results</h1>
                    <div
                        class=" flex flex-row flex-wrap overflow-x-auto justify-start gap-x-4 gap-y-2 mr-0 lg:mr-5 py-2">
                        <div v-if="filteredData.length === 0">
                            Item not found
                        </div>
                        <div v-else v-for="item in filteredData" :key="item.id" @click="editItem(item)">
                            <div v-if="!item.isDisabled"
                                class="flex h-full justify-between flex-col items-center relative ">
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
                            <div v-else class="flex h-full justify-between flex-col items-center relative ">
                                <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                                    class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center opacity-50">
                                <div
                                    class="flex justify-center items-center leading-none py-2 w-[175px] text-clamp4 font-regular text-center text-black opacity-50">
                                    {{ item.ProductName }}
                                </div>
                                <div class="text-[12px]  font-semibold text-lightgrey opacity-50">₱{{ item.UnitPrice
                                    }}.00
                                </div>
                                <Badge value="Disabled" class="bg-accent"></Badge>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>