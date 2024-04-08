<script setup>
import gsap from "gsap";
import { ref } from "vue";

const ClosePopup = () => {
    gsap.to(".add", {
        x: 10,
        opacity: 0,
        duration: .5,
        ease: "power4.out",
        stagger: 0.2,

    });
    gsap.to(".addwrapper", {
        x: 0,
        opacity: 0,
        duration: .5,
        ease: "power4.out",
        display: "none",
        backdropFilter: "blur(0px)",
    });
    console.log("clicked");
};
</script>

<template>
    <div
        class="addwrapper hidden items backdrop-blur-[0px] justify-end pr-0 h-screen w-screen font-sora select-none sm:pr-5">
        <div @click="ClosePopup" class=" fixed h-screen w-screen flex-grow hidden sm:block"></div>
        <div class="py-10 hidden sm:flex">
            <div class="add shadow-2xl flex flex-col w-[500px] bg-white opacity-0 rounded-[30px] overflow-hidden">
                <!-- TOP ------------------------------------------------>
                <div class="flex items-center justify-between border-b-2 px-10 py-5">
                    <h1 class="font-bold text-[24px]">Add Item</h1>
                    <Button label="Primary" @click="ClosePopup" class="bg-white hover:bg-offwhite duration-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 text-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>
                <!-- MIDDLE ------------------------------------------------>
                <div class="px-[40px] font-bold text-[20px] border-b-2 py-10 h-3/5 overflow-hidden">

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
                <Button label="Primary" @click="ClosePopup" class="bg-white hover:bg-offwhite duration-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </Button>
            </div>
            <!-- MIDDLE ------------------------------------------------>
            <div class="px-5 font-bold text-clamp4 border-b-2 py-10 h-3/5 overflow-y-auto">
                <div class="flex justify-end">
                    <span class="cursor-pointer">Clear all</span>
                </div>

                <div class="pt-[20px] font-light text-clamp4 text-lightgrey grid grid-cols-3">
                    <p>item</p>
                    <p class="flex justify-center">qty</p>
                    <p class="flex justify-end">subtotal</p>
                </div>

                <div class="pt-2 flex flex-col h-[70%] space-y-2 overflow-y-auto">
                    <!-- RETURN THIS, NOT SCROLLING WHEN USED SCROLL WHEEL  -->
                    <div class="grid grid-cols-3 text-[14px] font-normal">
                        <div class="flex gap-1 items-center">

                            <p class="text-center">Product Name</p>
                        </div>
                        <div class="flex justify-between items-center px-8">
                            <Icon icon="mingcute:add-fill" width="10px" height="10px" style="color: #0e0e0c" />
                            <p>1</p>
                            <Icon icon="uil:minus" width="10px" height="10px" style="color: #0e0e0c" />
                        </div>
                        <div class="flex justify-end items-center ">
                            <p class="fixed pr-[65px]">₱</p>
                            <p>100.00</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- BOTTOM ------------------------------------------------>
            <div class="px-5  space-y-5">
                <div class="flex justify-between font-bold text-[20px]">
                    <p>Total Price</p>
                    <p>₱ 100.00</p>
                </div>
                <div>
                    <p class="text-[14px] font-light">Choose Payment Method</p>
                    <div class="flex gap-3">
                        <Button label="Primary" class=" h-[40px] gap-2 hover:border-2 border-primary">
                            <Icon icon="ri:id-card-line" width="15px" height="15px" style="color: #0e0e0c" />
                            <p class="text-black">Tally</p>
                        </Button>
                        <Button label="Primary" class=" h-[40px] gap-2 hover:border-2  border-primary">
                            <Icon icon="ion:cash-outline" width="15px" height="15px" style="color: #0e0e0c" />
                            <p class="text-black">Cash</p>
                        </Button>
                    </div>
                </div>
                <div>
                    <Button label="Primary" class="w-full h-fit bg-primary hover:bg-accent ">
                        <p class="font-bold text-[20px]">Checkout</p>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>