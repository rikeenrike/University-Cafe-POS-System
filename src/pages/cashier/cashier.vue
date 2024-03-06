<script setup>

</script>

<template>
    <div class="px-5 relative md:px-[43px] grid grid-cols-[2fr,1fr] font-sora select-none"
        style="top: 80px; height: calc(100vh - 80px);">
        <div class="flex flex-col overflow-hidden">
            <div class="h-[180px] flex gap-2">
                <div class=" w-1/2 flex flex-col justify-evenly">
                    <h1 class="text-[32px] text-black font-bold">Ready</h1>
                    <div class="flex flex-row whitespace-nowrap gap-5 overflow-x-scroll overflow-y-hidden">
                        <div class="p-3 w-[256px] h-[99px] bg-accent rounded-[15px] text-offwhite">
                            <p class="text-[24px] font-bold">Customer Name</p>
                            <p class="text-[16px] font-light">Order#102313</p>
                            <p class="text-[12px] font-light">Item/s: 2X</p>
                        </div>
                    </div>
                </div>
                <div class="w-1/2 flex flex-col justify-evenly">
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
            <div class="border-2 h-[80%]">
                test
            </div>
        </div>
        <div class="border-2 ">
            checkout
        </div>
    </div>
</template>