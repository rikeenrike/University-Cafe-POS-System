<script setup>
import { ref } from "vue";
import { gsap } from "gsap";
const sidebarmenu = ref(false);
var itemsQty = ref(1);

var basket = ref(false);

let isBasketVisible = false;

const toggleBasket = () => {
  gsap.to(".basket", {
    duration: 0.5,
    display: "block",
    ease: "power4.out",
  });
  console.log("basket");
};

const menu = ref();
const toggle = (event) => {
  menu.value.toggle(event);
  console.log("toggle");
};
const items = ref([
  {
    label: "Logout",
  },
]);
</script>

<template>
    <div
        class="z-10 px-5 md:px-[43px] h-[80px] flex flex-col justify-center bg-white fixed w-screen font-sora select-none ">
        <div class="flex justify-between items-center h-full">
            <div class="flex items-center space-x-1">
                <div class="w-[57px]">
                    <img src="\src\pages\navigation\assets\CAFE LOGO.png" alt="logo">
                </div>
                <div class="flex items-center space-x-4">
                    <div class="hidden lg:block text-[34px] font-bold text-black">University Cafe</div>
                    <span class="hidden md:flex cursor-pointer  pl-0 lg:pl-10 space-x-4  text-darkgrey">
                        <router-link to="/cashier" active-class="text-black" class="hover:text-black duration-100">Cashier</router-link>
                        <router-link to="/kitchen" active-class="text-black" class="hover:text-black duration-100">Kitchen</router-link>
                        <div class="hover:text-black duration-100">Menu Management</div>
                        <div class="hover:text-black duration-100">Reports</div>
                    </span>
                </div>
            </div>


            <!-- basket icon -->
            <div @click="toggleBasket" class="relative cursor-pointer ml-auto mr-5 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <div v-if="itemsQty > 0">
                    <Badge :value="itemsQty" severity="success"
                        class=" absolute top-1 right-0 transform translate-x-[50%] -translate-y-[50%]" />
                </div>
            </div>

            <!-- account  -->
            <div class="hidden md:flex items-center space-x-2" @click="toggle">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-[20px] h-[20px]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
                <p>Account</p>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-[16px] h-[16px]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
            </div>


            <!-- SIDE BAR -->
            <div class="block md:hidden" @click="sidebarmenu = true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>

            <Sidebar v-model:visible="sidebarmenu" position="right">
                <span class="h-full flex flex-col justify-between text-[24px] font-bold space-y-2 font-sora">
                    <div>
                        <div>Cashier</div>
                        <div>Kitchen</div>
                        <div>Menu Management</div>
                        <div>Reports</div>
                    </div>
                    <div>Logout</div>
                </span>
            </Sidebar>
        </div>
    </div>
</template>