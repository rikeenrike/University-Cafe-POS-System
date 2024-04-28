<script setup>
import { ref, computed } from "vue";
import { gsap } from "gsap";
import { Orders } from "./scripts/Transaction.js";
import { useToast } from "primevue/usetoast";

import axios from "axios";

const toast = useToast();
const isEditing = ref(false);
const errorhighlight = ref(false);
const customerName = ref("Customer Name");
const additionalFees = ref(0);
const orderType = ref(0);
const paymentType = ref(0);
const total = ref(0);
const notes = ref("");

const DateTime = () => {
    const now = new Date();
    const options = { timeZone: 'Asia/Manila', hour24: false };
    const formattedDate = now.toLocaleDateString('fr-CA', options);
    const formattedTime = now.toLocaleTimeString('en-US', options);
    return {
        Date: formattedDate,
        Time: formattedTime,
    };
};

const dateTime = DateTime();

const newTransaction = computed(() => ({
        AdditionalFee: additionalFees.value,
        Alias: customerName.value,
        Date: dateTime.Date,
        MopID: paymentType.value,
        Notes: notes.value,
        OrderTypeID: orderType.value,
        Orders: finalOrders.value,
        StatusID: 1,
        Time: dateTime.Time,
        Total: total.value,
}));

const finalOrders = computed(() => {
    return Orders.value.map((item) => ({
        ProductID: item.ProductID,
        Quantity: item.quantity,
        Subtotal: item.Subtotal,
    }));
});

const handleTransaction = async () => {
    console.log(newTransaction.value);
    try {
        await axios.post("http://127.0.0.1:8000/api/transactions", newTransaction.value, {
            withCredentials: true
        });
        toast.add({ severity: 'success', summary: 'Order Placed', detail: 'Order has been placed', group: 'bc', life: 2000 });
    } catch (error) {
        console.log(error);
    } finally {
        clearAll();
    }
};

const checkFields = () => {
    if (orderType.value === 0) {
        toast.add({ severity: 'error', summary: 'Order Type', detail: 'Please select Order Type', group: 'bc', life: 5000 });
        errorhighlight.value = true;
        return;
    }
    if (paymentType.value === 0) {
        toast.add({ severity: 'error', summary: 'Payment Method', detail: 'Please select Payment Method', group: 'bc', life: 5000 });
        errorhighlight.value = true;
        return;
    }
    errorhighlight.value = false;
    handleTransaction();
};

// Basket Functions

const setOrderType = (type) => {
    if (type === orderType.value) {
        orderType.value = 0;
        return;
    }
    orderType.value = type;
    console.log(orderType.value);
};
const setPaymentType = (type) => {
    if (type === paymentType.value) {
        paymentType.value = 0;
        return;
    }
    paymentType.value = type;
    console.log(paymentType.value);
};
const increaseQuantity = (item) => {
    if (item.quantity === null) {
        return;
    }
    item.quantity++
    calculateSubTotal();
};
const decrementQuantity = (item) => {
    if (item.quantity === null) {
        return;
    }
    item.quantity--
    if (item.quantity === 0) {
        const index = Orders.value.indexOf(item);
        Orders.value.splice(index, 1);
    }
    calculateSubTotal();
};
const calculateSubTotal = () => {
    Orders.value.forEach((item) => {
        item.Subtotal = item.quantity * item.price;
    });
};
const calculateTotal = computed(() => {
    let itemsTotal = Orders.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total.value = itemsTotal + additionalFees.value;
});
const totalItems = computed(() => {
    return Orders.value.reduce((total, item) => total + item.quantity, 0);
});
const clearAll = () => {
    Orders.value = [];
    additionalFees.value = 0;
    orderType.value = 0;
    paymentType.value = 0;
    customerName.value = "Customer Name";
    isEditing.value = false;
    notes.value = "";
    toast.add({ severity: 'success', summary: 'Cleared', detail: 'Basket Cleared', group: 'bc', life: 2000 });
};
const toggleBasket = () => {
    gsap.to(".basket", {
        duration: 0.1,
        display: "none",
        ease: "power4.out",
    });
    console.log("basket");
};
</script>

<template>
    <div class="pb-5 hidden lg:flex">
        <div class="border-2 flex flex-col w-full bg-white rounded-[10px] overflow-hidden">
            <!-- TOP ------------------------------------------------>
            <div class="flex items-center justify-between border-b-2 px-5 py-5">
                <!-- customer and orderid -->
                <span>
                    <h1 class="font-bold text-[24px] flex items-center gap-2">
                        <input v-show="isEditing" v-model="customerName" class="border-2 w-3/5"
                            @blur="isEditing = false" />
                        <span v-show="!isEditing">{{ customerName }}</span>
                        <img src="./assets/icons/edit.svg" alt="" class="w-6 h-6 cursor-pointer"
                            @click="isEditing = true">
                    </h1>
                </span>
                <!-- clear button -->
                <Button @click="clearAll" label="Primary" class="group flex flex-col bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor"
                        class="w-[24px] h-[24px] cursor-pointer stroke-darkgrey group-hover:stroke-accent">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <p class="text-darkgrey text-[14px] group-hover:text-accent">clear all</p>
                </Button>
            </div>
            <!-- MIDDLE ------------------------------------------------>
            <div class="px-5 font-bold text-[20px] border-b-2 py-3 lg:h-full overflow-hidden">
                <span class="flex cursor-pointer">{{ totalItems }} item/s</span>

                <div class="pt-[20px] font-light text-[16px] text-lightgrey grid grid-cols-3 ">
                    <p>item</p>
                    <p class="flex justify-center">qty</p>
                    <p class="flex justify-end">subtotal</p>
                </div>

                <div v-if="Orders.length && Orders" class="pt-2 flex flex-col h-[190px] space-y-2 overflow-y-auto">
                    <li v-for="(item, index) in Orders" :key="index" class="grid grid-cols-3 text-[16px] font-normal">
                        <!-- item -->
                        <p class="text-left">{{ item.name }}</p>
                        <!-- quantity -->
                        <div class="flex justify-between items-center mx-6">
                            <svg @click="increaseQuantity(item)" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5"
                                class="w-6 h-6 cursor-pointer stroke-lightgrey active:stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p>{{ item.quantity }}</p>
                            <svg @click="decrementQuantity(item)" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5"
                                class="w-6 h-6 cursor-pointer stroke-lightgrey active:stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <!-- subtotal -->
                        <div class="flex justify-between items-center pl-12">
                            <p class="w-4 text-right">₱</p>
                            <p>{{ item.Subtotal }}.00</p>
                        </div>
                    </li>
                </div>

                <div v-else
                    class="text-lightgrey pt-2 flex flex-col justify-center items-center h-[190px] space-y-2 overflow-y-auto">
                    <p>No Items</p>
                </div>
            </div>
            <!-- BOTTOM ------------------------------------------------>
            <div class="px-5 my-5 space-y-5">
                <div class="flex justify-between items-center">
                    <p>Additional fees</p>
                    <InputNumber class="w-20 h-10 " size="small" v-model="additionalFees" placeholder="₱"
                        inputId="minmax" :min="0" />
                </div>
                <div class="flex justify-between font-bold text-[20px]">
                    <p>Total Price</p>
                    <p>₱ {{ calculateTotal }}.00</p>
                </div>
                <div>
                    <span class="flex gap-2 text-[14px]">
                        <p class=" font-light">Order Type</p>
                        <p v-if="errorhighlight" class="text-accent ">*</p>
                    </span>
                    <div class="flex gap-3 w-fit">
                        <Button label="Primary" class="h-[40px] gap-2 border-2"
                            :class="{ 'border-primary': orderType === 1 }" @click="setOrderType(1)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="black" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>
                            <p class="text-black">Dine in</p>
                        </Button>
                        <Button label="Primary" class="h-[40px] gap-2 border-2 "
                            :class="{ 'border-primary': orderType === 3 }" @click="setOrderType(3)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="black" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <p class="text-black">Take out</p>
                        </Button>
                    </div>
                </div>
                <div>
                    <span class="flex gap-2 text-[14px]">
                        <p class=" font-light">Payment Method</p>
                        <p v-if="errorhighlight" class="text-accent">*</p>
                    </span>
                    <div class="flex justify-between">
                        <div class="flex gap-3">
                            <Button label="Primary" class="h-[40px] gap-2 border-2"
                                :class="{ 'border-primary': paymentType === 1 }" @click="setPaymentType(1)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="black" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                                <p class="text-black">Gcash</p>
                            </Button>
                            <Button label="Primary" class="h-[40px] gap-2 border-2"
                                :class="{ 'border-primary': paymentType === 3 }" @click="setPaymentType(3)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="black" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>
                                <p class="text-black">Cash</p>
                            </Button>
                        </div>
                        <Button label="Primary" class="h-[40px] gap-2 border-2"
                            :class="{ 'border-primary': paymentType === 4 }" @click="setPaymentType(4)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="black" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>
                            <p class="text-black">Tally</p>
                        </Button>
                    </div>
                </div>
                <div>
                    <p>Notes</p>
                    <InputText type="text" v-model="notes" placeholder="e.g. 'extra shot of expresso' " />
                </div>
                <Button @click="checkFields()" label="Primary"
                    class="w-full h-fit bg-primary hover:bg-accent font-bold text-[20px]">
                    Place Order
                </Button>
            </div>
        </div>

    </div>

    <!-- mobile -->
    <div class="basket fixed hidden z-20 bottom-[.5px] right-[.5px] w-screen">
        <div class="border-2 flex flex-col h-screen bg-white lg:hidden">
            <!-- TOP ------------------------------------------------>
            <div class="flex items-center justify-between border-b-2 px-5 py-5">
                <!-- customer and orderid -->
                <span>
                    <h1 class="font-bold text-[24px] flex items-center gap-2">
                        <input v-show="isEditing" v-model="customerName" class="border-2" @blur="isEditing = false" />
                        <span v-show="!isEditing">{{ customerName }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6" @click="isEditing = true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </h1>
                </span>
                <!-- back button -->
                <div @click="toggleBasket">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>


            </div>
            <!-- MIDDLE ------------------------------------------------>
            <div class="flex flex-col flex-grow px-5 font-bold text-[20px] border-b-2 py-3 overflow-hidden">
                <span class="flex justify-between items-center">
                    <span class="flex cursor-pointer">{{ totalItems }} item/s</span>
                    <!-- clear button -->
                    <Button @click="clearAll" label="Primary" class="group flex flex-col bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        <p class="text-darkgrey text-[14px] group-hover:text-accent">clear all</p>
                    </Button>
                </span>

                <div class="pt-[20px] font-light text-[16px] text-lightgrey grid grid-cols-3">
                    <p>item</p>
                    <p class="flex justify-center">qty</p>
                    <p class="flex justify-end">subtotal</p>
                </div>
                <div v-if="Orders.length && Orders" class="pt-2 flex flex-col h-[190px] space-y-2 overflow-y-auto">
                    <li v-for="(item, index) in Orders" :key="index" class="grid grid-cols-3 text-[16px] font-normal">
                        <!-- item -->
                        <p class="text-left">{{ item.name }}</p>
                        <!-- quantity -->
                        <div class="flex justify-between items-center mx-6">
                            <svg @click="increaseQuantity(item)" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5"
                                class="w-6 h-6 cursor-pointer stroke-lightgrey active:stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p>{{ item.quantity }}</p>
                            <svg @click="decrementQuantity(item)" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5"
                                class="w-6 h-6 cursor-pointer stroke-lightgrey active:stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <!-- subtotal -->
                        <div class="flex justify-between items-center pl-12">
                            <p class="w-4 text-right">₱</p>
                            <p>{{ item.Subtotal }}.00</p>
                        </div>
                    </li>
                </div>

                <div v-else
                    class="text-lightgrey pt-2 flex flex-col justify-center items-center h-[190px] space-y-2 overflow-y-auto">
                    <p>No Items</p>
                </div>
            </div>
            <!-- BOTTOM ------------------------------------------------>
            <div class="px-5 my-5 space-y-5">
                <div class="flex justify-between items-center">
                    <p>Additional fees</p>
                    <InputNumber class="w-20 h-10" size="small" v-model="additionalFees" placeholder="₱" />
                </div>
                <div class="flex justify-between font-bold text-[20px]">
                    <p>Total Price</p>
                    <p>₱ {{ calculateTotal }}.00</p>
                </div>
                <div>
                    <span class="flex gap-2 text-[14px]">
                        <p class=" font-light">Order Type</p>
                        <p v-if="errorhighlight" class="text-accent ">*</p>
                    </span>
                    <div class="flex gap-3 w-fit">
                        <Button label="Primary" class="h-[40px] gap-2 border-2"
                            :class="{ 'border-primary': orderType === 1 }" @click="setOrderType(1)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="black" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>
                            <p class="text-black">Dine in</p>
                        </Button>
                        <Button label="Primary" class="h-[40px] gap-2 border-2 "
                            :class="{ 'border-primary': orderType === 3 }" @click="setOrderType(3)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="black" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <p class="text-black">Take out</p>
                        </Button>
                    </div>
                </div>
                <div>
                    <span class="flex gap-2 text-[14px]">
                        <p class=" font-light">Payment Method</p>
                        <p v-if="errorhighlight" class="text-accent">*</p>
                    </span>
                    <div class="flex justify-between">
                        <div class="flex gap-3">
                            <Button label="Primary" class="h-[40px] gap-2 border-2"
                                :class="{ 'border-primary': paymentType === 1 }" @click="setPaymentType(1)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="black" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                                <p class="text-black">Gcash</p>
                            </Button>
                            <Button label="Primary" class="h-[40px] gap-2 border-2"
                                :class="{ 'border-primary': paymentType === 3 }" @click="setPaymentType(3)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="black" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>
                                <p class="text-black ">Cash</p>
                            </Button>
                        </div>
                        <Button label="Primary" class="h-[40px] gap-2 border-2"
                            :class="{ 'border-primary': paymentType === 4 }" @click="setPaymentType(4)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="black" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>
                            <p class="text-black">Tally</p>
                        </Button>
                    </div>
                </div>
                <div>
                    <p>Notes</p>
                    <InputText type="text" v-model="notes" placeholder="e.g. 'extra shot of expresso' " />
                </div>
                <Button @click="checkFields()" label="Primary"
                    class="w-full h-fit bg-primary hover:bg-accent font-bold text-[20px]">
                    Place Order
                </Button>
            </div>
        </div>
    </div>
</template>