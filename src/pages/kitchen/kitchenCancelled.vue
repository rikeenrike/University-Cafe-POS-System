<script setup>
import { ref, computed } from "vue";
import { cancelledOrders } from "./assets/fetchTransactions";

const search = ref("");
const filteredResults = ref([]);

const filteredData = computed(() => {
    if (!search.value) {
        return cancelledOrders.value;
    }
    return filteredResults.value;
});
const filterData = () => {
    if (!cancelledOrders.value) {
        isloading.value = false;
        return;
    }
    filteredResults.value = cancelledOrders.value.filter(Trans =>
        Trans.FirstName.toLowerCase().includes(search.value.toLowerCase()) ||
        Trans.LastName.toLowerCase().includes(search.value.toLowerCase())
    );
};


</script>

<template>
    <div class="relative overflow-hidden top-[80px] px-5 md:px-[43px] font-sora" style="height: calc(100vh - 80px)">
        <h1 class="text-[32px] text-black font-bold">Cancelled Orders</h1>
        <span class="mr-0 lg:mr-5 flex relative ">
            <InputText size="large" v-model="search" placeholder="Search All" @input="filterData" />
        </span>
        <div v-show="search.length === 0" v-if="cancelledOrders.length"
            class="flex flex-row flex-wrap overflow-x-auto h-[calc(100vh-160px)] w-[calc(100vw-50px)]  md:w-[calc(100vw-95px)] xl:w-[100%] ">
            <div v-for="ong in cancelledOrders" :key="ong.TransID"
                >
                <div v-if="ong.ReferenceNumber && ong.Alias == ''" class="w-[413px] h-fit px-2 py-4 m-2 rounded-lg bg-offwhite">
                    <div class="flex gap-1 justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="w-6 h-6 text-accent">
                            <path fill-rule="evenodd"
                                d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z"
                                clip-rule="evenodd" />
                        </svg>
                        <p class="text-primary font-bold">ONLINE ORDER</p>
                    </div>
                    <!-- Name & Order Number -->
                    <div class="pb-3">
                        <p class="text-[24px] font-bold">{{ ong.FirstName + ' ' + ong.LastName }}</p>
                        <p class="text-[16px] font-light">Order# {{ ong.TransID }}</p>
                    </div>
                    <!-- Details -->
                    <div class="pb-3">
                        <p class="text-[20px] font-bold">Details</p>
                        <div class="flex">
                            <div class="text-[16px] mr-2">
                                <p>Time</p>
                                <p>Order type</p>
                                <p>Payment</p>
                                <p v-if="ong.ReferenceNumber">Reference Number</p>
                            </div>
                            <div>
                                <p>{{ ong.Time }}</p>
                                <p>{{ ong.OrderType }}</p>
                                <p>{{ ong.MOP }}</p>
                                <p v-if="ong.ReferenceNumber">{{ ong.ReferenceNumber }}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <p>Notes :</p>
                            <p class="break-all">
                                {{ ong.Notes }}
                            </p>
                        </div>
                    </div>
                    <!-- Order -->
                    <div>
                        <div class="flex justify-between border-y-2 border-black mb-2">
                            <p>Items</p>
                            <p>Qty</p>

                        </div>
                        <div v-if="ong.items.length">
                            <div v-for="items in ong.items" :key="items.ProductID" class="flex justify-between">
                                <p>{{ items.ProductName }}</p>
                                <p>{{ items.Qty }}</p>

                            </div>
                        </div>
                        <div v-else class="flex justify-center font-bold text-[25px]">
                            <p>No Items</p>
                        </div>
                    </div>
                    <div class="flex justify-between my-3">
                        <p class="text-[20px] font-bold">TOTAL</p>
                        <p class="text-[20px] font-bold">₱{{ ong.Total }}.00</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="flex flex-row justify-center items-center  h-[calc(100vh-130px)] w-screen xl:w-full">
            <p class="text-[32px] text-lightgrey font-bold">No Cancelled Orders</p>
        </div>
        <div v-show="search.length > 0">
            <div>
                <h1 class="text-lightgrey text-clamp2 font-bold ">Results</h1>
                <div class=" flex flex-row flex-wrap overflow-x-auto justify-start gap-x-4 gap-y-2 mr-0 lg:mr-5 py-2">
                    <div v-if="filteredData.length === 0">
                        Item not found
                    </div>
                    <div v-else v-for="ong in filteredData" :key="ong.ProductID" 
                        >
                        <div v-if="ong.ReferenceNumber && ong.Alias == ''"
                        class="w-[413px] h-fit px-2 py-4 m-2 rounded-lg bg-offwhite">
                            <div class="flex gap-1 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-6 h-6 text-accent">
                                    <path fill-rule="evenodd"
                                        d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z"
                                        clip-rule="evenodd" />
                                </svg>
                                <p class="text-primary font-bold">ONLINE ORDER</p>
                            </div>
                            <!-- Name & Order Number -->
                            <div class="pb-3">
                                <p class="text-[24px] font-bold">{{ ong.FirstName + ' ' + ong.LastName }}</p>
                                <p class="text-[16px] font-light">Order# {{ ong.TransID }}</p>
                            </div>
                            <!-- Details -->
                            <div class="pb-3">
                                <p class="text-[20px] font-bold">Details</p>
                                <div class="flex">
                                    <div class="text-[16px] mr-2">
                                        <p>Time</p>
                                        <p>Order type</p>
                                        <p>Payment</p>
                                        <p v-if="ong.ReferenceNumber">Reference Number</p>
                                    </div>
                                    <div>
                                        <p>{{ ong.Time }}</p>
                                        <p>{{ ong.OrderType }}</p>
                                        <p>{{ ong.MOP }}</p>
                                        <p v-if="ong.ReferenceNumber">{{ ong.ReferenceNumber }}</p>
                                    </div>
                                </div>
                                <div class="flex">
                                    <p>Notes :</p>
                                    <p class="break-all">
                                        {{ ong.Notes }}
                                    </p>
                                </div>
                            </div>
                            <!-- Order -->
                            <div>
                                <div class="flex justify-between border-y-2 border-black mb-2">
                                    <p>Items</p>
                                    <p>Qty</p>

                                </div>
                                <div v-if="ong.items.length">
                                    <div v-for="items in ong.items" :key="items.ProductID" class="flex justify-between">
                                        <p>{{ items.ProductName }}</p>
                                        <p>{{ items.Qty }}</p>

                                    </div>
                                </div>
                                <div v-else class="flex justify-center font-bold text-[25px]">
                                    <p>No Items</p>
                                </div>
                            </div>
                            <div class="flex justify-between my-3">
                                <p class="text-[20px] font-bold">TOTAL</p>
                                <p class="text-[20px] font-bold">₱{{ ong.Total }}.00</p>
                            </div>
                        </div>     
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>