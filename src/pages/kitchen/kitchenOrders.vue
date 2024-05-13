<script setup>
import { ref, onMounted, watch } from "vue";
import { fetchOrders, ongoingOrders, loading, fetchsuccess, readyOrders, updateOrderStatus, objectpasser, fetchLatestOrder } from "./assets/fetchTransactions";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { drinksproducts, foodsproducts } from "../cashier/scripts/fetchProducts.js";
import gsap from "gsap";



const confirm = useConfirm();
const toast = useToast();
const editingId = ref(null);



const cancelOrder = (TransID, items) => {
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        message: 'This will cancel the order. Please confirm to proceed.',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            updateOrderStatus(TransID, 5, items);
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

const setStatusAccept = (TransID, items) => {
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        message: 'This order will be marked as Accepted. Please confirm to proceed.',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            updateOrderStatus(TransID, 1, items);
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
const checkStocks = (items, TransID) => {
    const outOfStockItems = [];
    items.forEach((order) => {
        let productFound = false;
        drinksproducts.value.forEach((subcategory) => {
            subcategory.items.forEach((product) => {
                if (order.ProductID === product.ProductID) {
                    if (product.Stock < order.Qty) {
                        toast.add({ severity: 'error', summary: 'Error', detail: 'Out of stock for ', life: 3000 });
                        productFound = true;
                        outOfStockItems.push(order.ProductName);
                    }
                }
            });
        });

        foodsproducts.value.forEach((subcategory) => {
            subcategory.items.forEach((product) => {
                if (order.ProductID === product.ProductID) {
                   if(product.Stock < order.Qty){
                    toast.add({ severity: 'error', summary: 'Error', detail: 'Out of stock for ' + product.ProductName, life: 3000 });
                    outOfStockItems.push(order.ProductName);
                   }
                }
            });
        });
    });
    if(outOfStockItems.length === 0) {
        setStatusAccept(TransID, items);
    } else {
        outofStock(outOfStockItems, TransID, items);
};
};

const outofStock = (outOfStockItems, TransID, items) => {
    confirm.require({
        group: 'headless',
        header: 'Unfortunatley, we are out of stock for some items...',
        message: 'This order will be marked as Cancelled. Please confirm to proceed. These Items is/are ' + outOfStockItems,
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            updateOrderStatus(TransID, 5, items);
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const saveeditItem = async (TransID, OrderType, MOP, Notes, ReferenceNumber, Alias ) => {
    console.log(TransID, OrderType, MOP, Notes, ReferenceNumber, Alias);
    if (OrderType.value === '' && MOP.value === '' && Alias.value === '') {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill up all fields', life: 3000 });
        return;
    }
    let OrderTypeID = 0;
    if (OrderType.toLowerCase() === "dine in") {
        OrderTypeID = 1;
    } else if (OrderType.toLowerCase() === "take out") {
        OrderTypeID = 3;
    }else{
        return;
    }

    let MOPID = 0;
    if (MOP.toLowerCase() === "gcash"){
        MOPID = 1;
    }else if (MOP.toLowerCase() === "cash"){
        MOPID = 3;
    }else if (MOP.toLowerCase() === "tally"){
        MOPID = 4;
    }else{
        return;
    } 


    try {
        await axios.put('http://127.0.0.1:8000/api/transactions/update',{
            TransID: TransID,
            Alias: Alias,
            OrderTypeID: OrderTypeID,
            MopID: MOPID,
            ReferenceNumber: ReferenceNumber,
            Notes: Notes
        });
    }catch(error) {
        console.log(error);
    }
}

import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import axios from "axios";
gsap.registerPlugin(ScrollToPlugin);

const scrollToOngoing = () => {
    gsap.to('.containers', { duration: .5, scrollTo: "#ongoing", ease: "power4.out" });
};

const scrollToReady = () => {
    gsap.to('.containers', { duration: .5, scrollTo: "#ready", ease: "power4.out" });

};

onMounted(() => {
    fetchOrders();
});

</script>

<template>
    <div v-if="loading" class="fixed z-20 -top-[1px] w-full">
        <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
    </div>
    <div class="relative overflow-hidden top-[80px] px-5 md:px-[43px] font-sora" style="height: calc(100vh - 80px)">
        <div class="flex gap-2 xl:hidden">
            <Button severity="secondary" rounded label="Pending Orders" @click="scrollToOngoing" />
            <Button severity="secondary" rounded label="Ready" @click="scrollToReady" />
        </div>


        <div class="containers flex overflow-x-auto xl:grid xl:grid-cols-[2fr,.8fr]">
            <!-- ongoing -->
            <div id="ongoing" class="border-r-0 xl:border-r-2">
                <h1 class="text-[32px] text-black font-bold">Pending Orders</h1>
                <div v-if="ongoingOrders.length"
                    class="flex flex-row flex-wrap overflow-x-auto h-[calc(100vh-160px)] w-[calc(100vw-50px)]  md:w-[calc(100vw-95px)] xl:w-[100%]">
                    <!-- card -->
                    <div v-for=" ong in ongoingOrders" :key="ong.TransID"
                        class="w-[413px] m-1 h-fit px-2 py-4 rounded-lg bg-offwhite">
                        <div v-if="ong.Status === 1"> <!-- IF STATUS IS ONGOING -->
                            <div class="pb-3">
                                <!-- <svg @click="editingId = ong.TransID" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 cursor-pointer ml-auto ">
                                    <path
                                        d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path
                                        d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg> -->
                                <input v-show="editingId === ong.TransID" v-model="ong.Alias" class="border-2 w-3/5"
                                    @blur="editingId = null" />
                                <p v-show="editingId !== ong.TransID" v-if="ong.Alias !== ''"
                                    class="text-[24px] font-bold">{{ ong.Alias }}</p>
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
                                        <p v-if="ong.ReferenceNumber.length !== 0">Reference Number</p>

                                    </div>
                                    <div>
                                        <p>{{ ong.Time }}</p>
                                        <p v-show="editingId !== ong.TransID">{{ ong.OrderType }}</p>
                                        <input v-show="editingId === ong.TransID" v-model="ong.OrderType"
                                            class="border-2 w-3/5" @blur="editingId = null" />
                                        <p v-show="editingId !== ong.TransID">{{ ong.MOP }}</p>
                                        <input v-show="editingId === ong.TransID" v-model="ong.MOP"
                                            class="border-2 w-3/5" @blur="editingId = null" />
                                        <p v-show="editingId !== ong.TransID" v-if="ong.ReferenceNumber.length !== 0">{{
                                            ong.ReferenceNumber }}</p>
                                        <input v-show="editingId === ong.TransID"
                                            v-if="ong.ReferenceNumber.length !== 0" v-model="ong.ReferenceNumber"
                                            class="border-2 w-3/5" @blur="editingId = null" />
                                    </div>
                                </div>
                                <div class="flex">
                                    <p>Notes :</p>
                                    <p v-show="editingId !== ong.TransID" class="break-all">
                                        {{ ong.Notes }}
                                    </p>
                                    <textarea v-show="editingId === ong.TransID" v-model="ong.Notes"
                                        class="border-2 w-3/5" @blur="editingId = null"></textarea>
                                </div>
                                <div v-show="editingId === ong.TransID">
                                    <Button severity="secondary"
                                        @click="saveeditItem(ong.TransID, ong.OrderType, ong.MOP, ong.Notes, ong.ReferenceNumber, ong.Alias)">Save</Button>
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
                                <Button @click="cancelOrder(ong.TransID, ong.items)" label="Primary"
                                    class="group flex flex-col bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    <p class="text-darkgrey text-[14px] group-hover:text-accent">Cancel order</p>
                                </Button>
                                <Button severity="secondary" @click="setStatusReady(ong.TransID)"
                                    class="px-4 bg-accent hover:bg-primary active:bg-accent text-offwhite rounded-lg py-2">Mark
                                    as Ready</Button>
                            </div>
                        </div>
                        <div v-else-if="ong.Status === 6"> <!-- IF STATUS IS PENDING FOR ACCEPT -->
                            <div class="flex gap-1 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-6 h-6 text-accent">
                                    <path fill-rule="evenodd"
                                        d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z"
                                        clip-rule="evenodd" />
                                </svg>
                                <p class="text-primary font-bold">ONLINE ORDER</p>
                            </div>
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
                                        <p>Reference Number</p>
                                    </div>
                                    <div>
                                        <p>:{{ ong.Time }}</p>
                                        <p>:{{ ong.OrderType }}</p>
                                        <p>:{{ ong.MOP }}</p>
                                        <p>:{{ ong.ReferenceNumber }}</p>
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
                                <Button @click="cancelOrder(ong.TransID, ong.items)" label="Primary"
                                    class="group flex flex-col bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    <p class="text-darkgrey text-[14px] group-hover:text-accent">Cancel order</p>
                                </Button>
                                <Button severity="secondary" @click="checkStocks(ong.items, ong.TransID)"
                                    class="px-4 bg-accent hover:bg-primary active:bg-accent text-offwhite rounded-lg py-2">Accept
                                    Order ?</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else
                    class="flex flex-row justify-center items-center  h-[calc(100vh-130px)] pr-10 md:pr-[86px] w-screen xl:w-full ">
                    <p class="text-[32px] text-lightgrey font-bold text-center">No ongoing orders</p>
                </div>
            </div>
            <!-- Ready -->
            <div id="ready">
                <h1 class="text-[32px] text-black font-bold pl-2">Ready</h1>
                <div v-if="readyOrders.length"
                    class="flex flex-wrap  xl:flex-nowrap xl:flex-col xl:space-y-5 overflow-auto h-[calc(100vh-160px)] w-[calc(100vw-50px)]  md:w-[calc(100vw-95px)] xl:w-fit  ">
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5"
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
                <div v-else class="flex flex-row justify-center items-center  h-[calc(100vh-130px)] w-screen xl:w-full">
                    <p class="text-[32px] text-lightgrey font-bold">No orders ready</p>
                </div>
            </div>
        </div>
    </div>

</template>
