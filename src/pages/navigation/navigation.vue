<script setup>
import { ref } from 'vue'

const sidebarmenu = ref(false);
</script>

<template>
    <div class="px-5 md:px-[43px] h-[80px] font-sora select-none ">
        <div class="flex justify-between items-center h-full">
            <div class="flex items-center space-x-1">
                <div class="w-[57px]">
                    <img src="\src\pages\navigation\assets\CAFE LOGO.png" alt="logo">
                </div>
                <div class="flex items-center space-x-4">
                    <div class="hidden lg:block text-[34px] font-bold text-black">University Cafe</div>
                    <span class="hidden md:flex pl-0 lg:pl-10 space-x-4  text-darkgrey">
                        <div>Cashier</div>
                        <div>Kitchen</div>
                        <div>Menu Management</div>
                        <div>Reports</div>
                    </span>

                </div>
            </div>
            <div class="hidden md:flex items-center space-x-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-[20px] h-[20px]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
                <div>Account</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-[16px] h-[16px]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="block md:hidden" @click="sidebarmenu = true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>

            <!-- SIDE BAR -->
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