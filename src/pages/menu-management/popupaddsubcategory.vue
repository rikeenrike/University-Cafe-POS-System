<script setup>
import { ref } from 'vue'
import { ClosePopup, newSubCategory } from "./scripts/modifyItems";
import { useToast } from "primevue/usetoast";
import axios from "axios";

const toast = useToast();
const isInputValid = ref(false);
const addSubcategory = async () => {
    if (newSubCategory.value.SubCategory === "") {
        isInputValid.value = true;
        toast.add({ severity: "error", summary: "Error", detail: "Please fill in all fields", group: 'bc', life: 2000 });
        return;
    }else{
        isInputValid.value = false;
    }
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/product_sub_category", newSubCategory.value)
        if(response){
            const data = await response.data;
            console.log(data);
            toast.add({ severity: 'success', summary: 'Subcategory Added!', detail: 'Subcategory has been successfully added', group: 'bc', life: 2000 });
        }else {
            throw new Error('Request failed');
        }
    } catch (error) {
        toast.add({ severity: "error", summary: "Error", detail: "Changes were not made", group: 'bc', life: 2000 });
        console.error(error);
    }
    ClosePopup(".addsub", ".addsubwrapper")
}   
</script>

<template>
    <div class="addsubwrapper hidden items backdrop-blur-[0px] justify-end items-center pr-0 h-screen w-screen font-sora select-none
        sm:pr-5">
        <div @click="ClosePopup('.addsub', '.addsubwrapper'); isInputValid = false"
            class=" fixed h-screen w-screen flex-grow hidden sm:block">
        </div>
        <div class="py-5 hidden sm:flex">
            <div class="addsub shadow-2xl flex flex-col w-[500px] bg-white opacity-0  rounded-[30px] overflow-hidden">
                <!-- TOP ------------------------------------------------>
                <div class="flex items-center justify-between border-b-2 px-10 py-5">
                    <h1 class="font-bold text-[24px]">Add subcategory</h1>
                    <Button label="Primary" @click="ClosePopup('.addsub', '.addsubwrapper'); isInputValid = false"
                        class="bg-white hover:bg-offwhite duration-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 text-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>
                <!-- MIDDLE ------------------------------------------------>
                <div class="px-[40px] py-5 font-bold text-[20px] border-b-2 overflow-hidden">
                    <div class="py-5">
                        <label class="text-[14px] font-semibold">Sub Category Name</label>
                        <InputText size="large" v-model="newSubCategory.SubCategory" placeholder="Sub Category Name"
                            :invalid="isInputValid" />
                    </div>
                </div>
                <!-- BOTTOM ------------------------------------------------>
                <div class="px-10 my-10 space-y-5">
                    <div>
                        <Button @click="addSubcategory()" label="Primary"
                            class="w-full h-fit bg-primary hover:bg-accent ">
                            <p class="font-bold text-[20px]">Save</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>


        <!-- MOBILE PHONE ------------------------------------->
        <div class="border-2 flex flex-col justify-around flex-grow bg-white  sm:hidden">
            <!-- TOP ------------------------------------------------>
            <div class="flex items-center justify-between px-5 py-5">
                <h1 class="font-bold text-[24px]">Add Sub Category</h1>
                <Button label="Primary" @click="ClosePopup('.addsub', '.addsubwrapper')"
                    class="bg-white hover:bg-offwhite duration-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </Button>
            </div>
            <!-- MIDDLE ------------------------------------------------>
            <div class="p-5 font-bold text-clamp4   h-3/5 overflow-y-auto">
                <div class="flex space-x-3">
                    <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                        class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center group-hover:opacity-50">
                    <div class="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-[20px] h-[20px]">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <p class="text-black text-[14px]">Add Image</p>
                    </div>
                </div>
                <div class="py-5">
                    <label class="text-[14px] font-semibold">Sub Category Name</label>
                    <InputText size="large" v-model="newSubCategory.SubCategory" placeholder="Sub Category Name"
                        :invalid="isInputValid" />
                </div>
            </div>
            <!-- BOTTOM ------------------------------------------------>
            <div class="p-5 space-y-5 ">
                <div>
                    <Button @click="addSubcategory()" label="Primary" class="w-full h-fit bg-primary hover:bg-accent ">
                        <p class="font-bold text-[20px]">Save</p>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>