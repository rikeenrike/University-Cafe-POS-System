<script setup>
import { ClosePopup, itemData } from "./scripts/modifyItems";


</script>

<template>
    <div
        class="addwrapper hidden items backdrop-blur-[0px] justify-end pr-0 h-screen w-screen font-sora select-none sm:pr-5">
        <div @click="ClosePopup('.add', '.addwrapper')" class=" fixed h-screen w-screen flex-grow hidden sm:block">
        </div>
        <div class="py-10 hidden sm:flex">
            <div class="add shadow-2xl flex flex-col w-[500px] bg-white opacity-0 rounded-[30px] overflow-hidden">
                <!-- TOP ------------------------------------------------>
                <div class="flex items-center justify-between border-b-2 px-10 py-5">
                    <h1 class="font-bold text-[24px]">Add Item</h1>
                    <Button label="Primary" @click="ClosePopup('.add', '.addwrapper')"
                        class="bg-white hover:bg-offwhite duration-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 text-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>
                <!-- MIDDLE ------------------------------------------------>
                <div class="px-[40px] font-bold text-[20px] border-b-2 py-10 h-3/5 overflow-hidden">
                    <div class="flex space-x-3">
                        <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                            class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center group-hover:opacity-50">
                        <div class="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-[20px] h-[20px]">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                            <p class="text-black text-[14px]">Add Image</p>
                        </div>
                    </div>
                    <div class="py-5">
                        <label class="text-[14px] font-semibold">Product name</label>
                        <InputText size="large" v-model="itemData.ProductName" placeholder="Product Name" />
                        <label class="text-[14px] font-semibold">Unit Price</label>
                        <InputText size="large" v-model="itemData.UnitPrice" placeholder="Price" />
                        <label class="text-[14px] font-semibold">Stock</label>
                        <InputText size="large" v-model="itemData.Stock" placeholder="Stock" />
                    </div>
                </div>
                <!-- BOTTOM ------------------------------------------------>
                <div class="px-10 my-10 space-y-5">
                    <div>
                        <Button label="Primary" class="w-full h-fit bg-primary hover:bg-accent ">
                            <p class="font-bold text-[20px]">Checkout</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>


        <!-- MOBILE PHONE ------------------------------------->
        <div class="border-2 flex flex-col justify-around flex-grow bg-white  sm:hidden">
            <!-- TOP ------------------------------------------------>
            <div class="flex items-center justify-between border-b-2 px-5 py-5">
                <h1 class="font-bold text-[24px]">Your Basket</h1>
                <Button label="Primary" @click="ClosePopup('.add', '.addwrapper')"
                    class="bg-white hover:bg-offwhite duration-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </Button>
            </div>
            <!-- MIDDLE ------------------------------------------------>
            <div class="px-5 font-bold text-clamp4 border-b-2 py-10 h-3/5 overflow-y-auto">

            </div>

            <!-- BOTTOM ------------------------------------------------>
            <div class="px-5  space-y-5">

                <Button label="Primary" class="w-full h-fit bg-primary hover:bg-accent ">
                    <p class="font-bold text-[20px]">Checkout</p>
                </Button>
            </div>
        </div>
    </div>
</template>