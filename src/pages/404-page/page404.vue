<template>
    <div class="h-screen w-screen flex flex-col items-center justify-center bg-white font-sora">
        <div class="flex items-center gap-2 text-clamp3 font-bold ">
            <img class="w-12" src="\src\pages\login\assets\CAFE LOGO.png" alt="logo">
 
        </div>
        <div class="flex flex-col items-center">
            <h2 class="text-[120px] font-black text-accent leading-none">404</h2>
            <h2 class="text-[30px] text-black">Page not Found</h2>
            <p class="text-clamp4 mb-5  text-black text-center">The page you're looking for doesn't exist.</p>
            <button class="px-4 bg-accent hover:bg-primary active:bg-accent text-offwhite rounded-lg py-2">
                <router-link to="/cashier/menu/drinks">return to home</router-link>
            </button>
        </div>

    </div>
</template>
