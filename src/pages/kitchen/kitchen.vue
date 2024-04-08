<script setup>
import { ref } from "vue";
import { ongoingOrders, loading, fetchsuccess, readyOrders, updateOrderStatus } from "./assets/fetchTransactions";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const cancelOrder = (TransID) => {
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        message: 'This will cancel the order. Please confirm to proceed.',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            updateOrderStatus(TransID, 5);
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const setStatusReady = (TransID) => {
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        message: 'This order will be marked as ready. Please confirm to proceed.',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            updateOrderStatus(TransID, 2);
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};


const setStatusComplete = (TransID) => {
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        message: 'This order will be marked as Complete. Please confirm to proceed.',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            updateOrderStatus(TransID, 3);
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}
</script>

<template>
    <div class="relative top-[80px] font-sora px-5 md:px-[43px] xl:grid grid-cols-[2fr,.8fr] "
        style="height: calc(100vh - 80px)">
        <div v-if="loading" class="fixed z-20 -top-[1px] w-full">
            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>
        <div class="border-r-0 xl:border-r-2">
            <h1 class="text-[32px] text-black font-bold">Ongoing</h1>
            <div v-if="ongoingOrders.length" class="flex flex-row flex-wrap overflow-x-auto h-[calc(100vh-130px)] ">
                <!-- card -->
                <div v-for=" ong in ongoingOrders" :key="ong.TransID"
                    class="w-[413px] m-1 h-fit px-2 py-4 rounded-lg bg-offwhite">
                    <!-- Name & Order Number -->
                    <div class="pb-3">
                        <p v-if="ong.Alias !== null" class="text-[24px] font-bold">{{ ong.Alias }}</p>
                        <p v-else class="text-[24px] font-bold">{{ ong.FirstName + ' ' + ong.LastName }}</p>
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
                            </div>
                            <div>
                                <p>{{ ong.Time }}</p>
                                <p>{{ ong.OrderType }}</p>
                                <p>{{ ong.MOP }}</p>
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
                    <!-- buttons -->
                    <div class="flex justify-between items-center">
                        <Button @click="cancelOrder(ong.TransID)" label="Primary"
                            class="group flex flex-col bg-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <p class="text-darkgrey text-[14px] group-hover:text-accent">Cancel order</p>
                        </Button>
                        <button @click="setStatusReady(ong.TransID)"
                            class="px-4 bg-accent hover:bg-primary active:bg-accent text-offwhite rounded-lg py-2">Mark
                            as Ready</button>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-row justify-center items-center  h-[calc(100vh-130px)] ">
                <p class="text-[32px] text-lightgrey font-bold text-center">No ongoing orders</p>
            </div>
        </div>
        <!-- Ready -->
        <div>
            <h1 class="text-[32px] text-black font-bold pl-0 xl:pl-5">Ready</h1>
            <div v-if="readyOrders.length"
                class="flex flex-wrap pl-0 xl:flex-nowrap xl:flex-col xl:space-y-5 xl:pl-5  overflow-auto h-[calc(100vh-130px)]">
                <div v-for="ong in readyOrders" :key="ong.TransID"
                    class="w-[413px] h-fit px-2 py-4 m-2 rounded-lg bg-offwhite">
                    <!-- Name & Order Number -->
                    <div class="pb-3">
                        <p v-if="ong.Alias !== null" class="text-[24px] font-bold">{{ ong.Alias }}</p>
                        <p v-else class="text-[24px] font-bold">{{ ong.FirstName + ' ' + ong.LastName }}</p>
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
                            </div>
                            <div>
                                <p>{{ ong.Time }}</p>
                                <p>{{ ong.OrderType }}</p>
                                <p>{{ ong.MOP }}</p>
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
                    <!-- buttons -->
                    <div class="flex justify-between items-center">
                        <Button @click="cancelOrder(ong.TransID)" label="Primary"
                            class="group flex flex-col bg-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <p class="text-darkgrey text-[14px] group-hover:text-accent">Cancel order</p>
                        </Button>
                        <button @click="setStatusComplete(ong.TransID)"
                            class="px-4 bg-accent hover:bg-primary active:bg-accent text-offwhite rounded-lg py-2">Complete</button>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-row justify-center items-center  h-[calc(100vh-130px)] ">
                <p class="text-[32px] text-lightgrey font-bold">No orders ready</p>
            </div>
        </div>
    </div>
</template>
