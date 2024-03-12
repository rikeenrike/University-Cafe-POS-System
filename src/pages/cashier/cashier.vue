<script setup>
import basket from './basket.vue'
</script>

<template>
    <div class="px-5 relative md:px-[43px] grid lg:grid-cols-[2fr,2fr] xl:grid-cols-[2fr,1.1fr]  font-sora select-none"
        style="top: 80px; height: calc(100vh - 80px);">
        <div class="flex flex-col overflow-hidden">

            <!-- status -->
            <div class=" flex pr-[20px] h-[180px]  gap-2">
                <div class="w-full xl:flex xl:w-1/2 flex-col justify-evenly">
                    <h1 class="text-[32px] text-black font-bold">Ready</h1>
                    <div class="flex flex-row whitespace-nowrap gap-5 overflow-x-scroll overflow-auto">
                        <div class="p-3 w-[256px] h-[99px] bg-accent rounded-[15px] text-offwhite">
                            <p class="text-[24p x] font-bold">Customer Name</p>
                            <p class="text-[16px] font-light">Order#102313</p>
                            <p class="text-[12px] font-light">Item/s: 2X</p>
                        </div>
                    </div>
                </div>
                <div class="hidden xl:flex w-1/2  flex-col justify-evenly">
                    <h1 class="text-[32px] text-black font-bold">Ongoing</h1>
                    <div class="flex flex-row whitespace-nowrap gap-5 overflow-x-scroll overflow-y-hidden">
                        <div class="p-3 w-[256px] h-[99px] bg-secondary rounded-[15px] text-accent">
                            <p class="text-[24px] font-bold">Customer Name</p>
                            <p class="text-[16px] font-light">Order#102313</p>
                            <p class="text-[12px] font-light">Item/s: 2X</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- menu -->
            <router-view />
        </div>

        <!-- basket -->
        <div
            class="basket hidden fixed z-20 w-full h-[80%] top-1 bg-white lg:relative lg:w-auto lg:h-auto border-2 mb-1 lg:flex flex-col rounded-lg  ">
            <basket />
        </div>

    </div>

</template>