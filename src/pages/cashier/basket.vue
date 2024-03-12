<script setup>
import { ref } from 'vue'

var quantity = ref(1)
var isEditing = ref(false)
var customerName = ref('Customer Name')
var additionalFees = ref(0)


var orderType = ref(null)

const setOrderType = (type) => {
    if (type === orderType.value) {
        orderType.value = null
        return
    }
    orderType.value = type
}

var paymentType = ref(null)
const setPaymentType = (type) => {
    if (type === paymentType.value) {
        paymentType.value = null
        return
    }
    paymentType.value = type
    console.log(paymentType.value)
}

var increaseQuantity = () => {
    if (quantity.value === null) {
        return
    }
    quantity.value++
}
var decrementQuantity = () => {
    if (quantity.value === null) {
        return
    }

    if (quantity.value === 0) {
        //remove the item from the list
        //return
    }
    quantity.value--
}

var clearAll = () => {
    //clear all the items in the basket
}
</script>

<template>

    <!-- TOP ------------------------------------------------>
    <div class="flex items-center justify-between border-b-2 px-5 py-5">
        <!-- customer and orderid -->
        <span>
            <h1 class="font-bold text-[24px] flex items-center gap-2">
                <input v-show="isEditing" v-model="customerName" class="border-2" @blur="isEditing = false">
                <span v-show="!isEditing">{{ customerName }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6" @click="isEditing = true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </h1>
            <h2 class="font-regular text-[16px]">Order#102313</h2>
        </span>
        <!-- clear button -->
        <Button @click="clearAll" label="Primary" class="group flex flex-col bg-transparent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <p class="text-darkgrey text-[14px] group-hover:text-accent">clear</p>
        </Button>
    </div>
    <!-- MIDDLE ------------------------------------------------>
    <div class="h-3/5 px-5 font-bold text-[20px] border-b-2 py-3 lg:h-full overflow-hidden">
        <span class="flex cursor-pointer">1 item/s</span>
        <div class="pt-[20px] font-light text-[16px] text-lightgrey grid grid-cols-3">
            <p>item</p>
            <p class="flex justify-center">qty</p>
            <p class="flex justify-end">subtotal</p>
        </div>
        <div class="pt-2 flex flex-col h-[70%] space-y-2 overflow-y-auto">
            <!-- RETURN THIS, NOT SCROLLING WHEN USED SCROLL WHEEL  -->
            <div class="grid grid-cols-3 text-[16px] font-normal">
                <div class="flex gap-1 items-center">
                    <p class="text-left">Product Name</p>
                </div>
                <div class="flex justify-between items-center mx-8">
                    <svg @click="increaseQuantity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" class="w-6 h-6 cursor-pointer  stroke-lightgrey active:stroke-black">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p>{{ quantity }}</p>
                    <svg @click="decrementQuantity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" class="w-6 h-6 cursor-pointer  stroke-lightgrey active:stroke-black">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div class="flex justify-end items-center pl-[60px]">
                    <p class="absolute right-[135px]">₱</p>
                    <p>100.00</p>
                </div>
            </div>

        </div>
    </div>
    <!-- BOTTOM ------------------------------------------------>
    <div class="bg-white h-full  px-5 my-5 space-y-5">
        <div class="flex justify-between items-center">
            <p>Additional fees</p>
            <span class="relative w-20">
                <InputText size="small" v-model="additionalFees" placeholder="₱" />
            </span>
        </div>
        <div class="flex justify-between font-bold text-[20px]">
            <p>Total Price</p>
            <p>₱ 100.00</p>
        </div>
        <div>
            <p class="text-[14px] font-light">Order type</p>
            <div class="flex gap-3">
                <Button label="Primary" class="h-[40px] gap-2 border-primary"
                    :class="{ 'border-2': orderType === 'Dine in' }" @click="setOrderType('Dine in')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="black" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    <p class="text-black">Dine in</p>
                </Button>
                <Button label="Primary" class="h-[40px] gap-2 border-primary"
                    :class="{ 'border-2': orderType === 'Take out' }" @click="setOrderType('Take out')">
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
            <p class="text-[14px] font-light">Choose Payment Method</p>
            <div class="flex justify-between">
                <div class="flex gap-3">
                    <Button label="Primary" class="h-[40px] gap-2 border-primary"
                        :class="{ 'border-2': paymentType === 'Gcash' }" @click="setPaymentType('Gcash')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                        <p class="text-black">Gcash</p>
                    </Button>
                    <Button label="Primary" class="h-[40px] gap-2 border-primary"
                        :class="{ 'border-2': paymentType === 'Cash' }" @click="setPaymentType('Cash')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>
                        <p class="text-black">Cash</p>
                    </Button>
                </div>
                <Button label="Primary" class="h-[40px] gap-2 border-primary"
                    :class="{ 'border-2': paymentType === 'Tally' }" @click="setPaymentType('Tally')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="black" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                    </svg>
                    <p class="text-black">Tally (Employee)</p>
                </Button>
            </div>
        </div>
        <Button label="Primary" class="w-full h-fit bg-primary hover:bg-accent ">
            <p class="font-bold text-[20px]">Complete Order</p>
        </Button>
    </div>

</template>