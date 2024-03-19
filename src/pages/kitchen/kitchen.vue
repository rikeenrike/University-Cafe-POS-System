<script setup>
</script>

<template>
    <div class="relative top-[80px] font-sora px-5 md:px-[43px] lg:grid grid-cols-[2fr,.8fr] "
        style="height: calc(100vh - 80px)">
        <div class="border-r-2 ">
            <h1 class="text-[32px] text-black font-bold">Ongoing</h1>
            <!-- card -->
            <div class="w-[413px] px-2 py-4 rounded-lg bg-offwhite">
                <!-- Name & Order Number -->
                <div class="pb-3">
                    <p class="text-[24px] font-bold">Customer Name</p>
                    <p class="text-[16px] font-light">Order#102342</p>
                </div>
                <!-- Details -->
                <div class="pb-3">
                    <p class="text-[20px] font-bold">Details</p>
                    <div class="flex">
                        <div class="text-[16px] mr-2">
                            <p>Time</p>
                            <p>Order type</p>
                            <p>Payment</p>
                        </div>
                        <div>
                            <p>: 2:57:01 PM</p>
                            <p>: Take Out</p>
                            <p>: Cash</p>
                        </div>
                    </div>
                </div>
                <!-- Order -->
                <div>
                    <div class="flex justify-between border-y-2 border-black mb-2">
                        <p>Items</p>
                        <p>Qty</p>
                        <p>Sub total</p>
                    </div>
                    <div class="flex justify-between">
                        <p>Item 1</p>
                        <p>1</p>
                        <p>₱ 100.00</p>
                    </div>
                    <div class="flex justify-between">
                        <p>Item 1</p>
                        <p>1</p>
                        <p>₱ 100.00</p>
                    </div>
                </div>
                <div class="flex justify-between my-3">
                    <p class="text-[20px] font-bold">TOTAL</p>
                    <p class="text-[20px] font-bold">₱100.00</p>
                </div>
                <!-- buttons -->
                <div class="flex justify-between items-center">
                    <Button @click="clearAll" label="Primary" class="group flex flex-col bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        <p class="text-darkgrey text-[14px] group-hover:text-accent">Cancel order</p>
                    </Button>
                    <button class="px-4 bg-accent text-offwhite rounded-lg py-2">Mark as Ready</button>
                </div>
            </div>
        </div>

        <div>
            <h1 class="text-[32px] text-black font-bold">Ready</h1>
        </div>
    </div>
</template>
