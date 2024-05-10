<script setup>
import { ref } from 'vue'
import { ClosePopup, newItem, loading } from "./scripts/modifyItems";
import { useToast } from "primevue/usetoast";
import { drinksproducts, foodsproducts } from '../cashier/scripts/fetchProducts';
import axios from "axios";

const toast = useToast();
const isInputValid = ref(false);

const saveNewItem = async () => {
    if (newItem.value.ProductName === "" || newItem.value.UnitPrice === "" || newItem.value.Stock === "") {
        isInputValid.value = true;
        toast.add({ severity: "error", summary: "Error", detail: "Please fill in all fields", group: 'bc', life: 2000 });
        return;
    } else {
        isInputValid.value = false;
    }
    loading.value = true;
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/products/add", newItem.value)
        if (response) {
            const data = await response.data;

            toast.add({ severity: 'success', summary: 'Item added!', detail: 'Item has been successfully added', group: 'bc', life: 2000 });

            let found = false;

            for (let i = 0; i < foodsproducts.value.length; i++) {
                if (foodsproducts.value[i].SubCateID == newItem.value.SubCateID) {
                    foodsproducts.value[i].items.push(data);
                    found = true;
                    break;
                }
            }

            if (!found) {
                for (let i = 0; i < drinksproducts.value.length; i++) {
                    if (drinksproducts.value[i].SubCateID == newItem.value.SubCateID) {
                        drinksproducts.value[i].items.push(data);
                        console.log(drinksproducts.value)
                        break;
                    }
                }
            }
        }
    } catch(error) {
        console.error(error);
        toast.add({ severity: "error", summary: "Error", detail: "Changes were not made", group: 'bc', life: 2000 });
    } finally {
        loading.value = false
    }
    ClosePopup(".add", ".addwrapper")
}

const imageFile = ref(null);

const handleFileUpload = (e) => {
    imageFile.value = e.target.files[0];
    console.log(imageFile.value);
}

const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", imageFile.value);
    try {
        const response = await axios.post("", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(response);  
    } catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <div class="addwrapper hidden items backdrop-blur-[0px] justify-end items-center pr-0 h-screen w-screen font-sora select-none
        sm:pr-5">
        <div @click="ClosePopup('.add', '.addwrapper'); isInputValid = false"
            class=" fixed h-screen w-screen flex-grow hidden sm:block">
        </div>
        <div class="py-5 hidden sm:flex">
            <div class="add shadow-2xl flex flex-col w-[500px] bg-white opacity-0 rounded-[30px] overflow-hidden">
                <!-- TOP ------------------------------------------------>
                <div class="flex items-center justify-between border-b-2 px-10 py-5">
                    <h1 class="font-bold text-[24px]">Add Item</h1>
                    <Button label="Primary" @click="ClosePopup('.add', '.addwrapper'); isInputValid = false"
                        class="bg-white hover:bg-offwhite duration-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 text-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>
                <!-- MIDDLE ------------------------------------------------>
                <div class="px-[40px] py-5 font-bold text-[20px] border-b-2 overflow-hidden">
                    <div class="flex space-x-3">
                        <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                            class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center group-hover:opacity-50">
                        <div class="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-[20px] h-[20px]">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                            <!-- <p class="text-black text-[14px]">Add Image</p> -->
                            <input type="file" ref="imageFile" @change="handleFileUpload" />
                            <button v-on:click="submitFile">Upload</button>
                        </div>
                    </div>
                    <div class="py-5">
                        <label class="text-[14px] font-semibold">Product name</label>
                        <InputText size="large" v-model="newItem.ProductName" placeholder="Product Name"
                            :invalid="isInputValid" />
                        <div class="flex flex-col ">
                            <label class="text-[14px] font-semibold">Unit Price</label>
                            <InputNumber size="small" v-model="newItem.UnitPrice" placeholder="Price" inputId="minmax"
                                :min="0" :invalid="isInputValid" />
                        </div>
                        <div div class="flex flex-col ">
                            <label class="text-[14px] font-semibold">Stock</label>
                            <InputNumber size="small" v-model="newItem.Stock" placeholder="Stock" inputId="minmax"
                                :min="0" :invalid="isInputValid" />
                        </div>
                    </div>
                </div>
                <!-- BOTTOM ------------------------------------------------>
                <div class="px-10 my-10 space-y-5">
                    <div>
                        <Button @click="saveNewItem" label="Primary" class="w-full h-fit bg-primary hover:bg-accent ">
                            <p class="font-bold text-[20px]">Save</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>


        <!-- MOBILE PHONE ------------------------------------->
        <div class="border-2 flex flex-col justify-around flex-grow bg-white  sm:hidden">
            <!-- TOP ------------------------------------------------>
            <div class="flex items-center justify-between border-b-2 px-5 py-5">
                <h1 class="font-bold text-[24px]">Add Item</h1>
                <Button label="Primary" @click="ClosePopup('.add', '.addwrapper')"
                    class="bg-white hover:bg-offwhite duration-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </Button>
            </div>
            <!-- MIDDLE ------------------------------------------------>
            <div class="p-5 font-bold text-clamp4 h-3/5 overflow-y-auto">
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
                    <label class="text-[14px] font-semibold">Product name</label>
                    <InputText size="large" v-model="newItem.ProductName" placeholder="Product Name"
                        :invalid="isInputValid" />
                    <div class="flex flex-col ">
                        <label class="text-[14px] font-semibold">Unit Price</label>
                        <InputNumber size="small" v-model="newItem.UnitPrice" placeholder="Price" inputId="minmax"
                            :min="0" :invalid="isInputValid" />
                    </div>
                    <div div class="flex flex-col ">
                        <label class="text-[14px] font-semibold">Stock</label>
                        <InputNumber size="small" v-model="newItem.Stock" placeholder="Stock" inputId="minmax" :min="0"
                            :invalid="isInputValid" />
                    </div>
                </div>
            </div>

            <!-- BOTTOM ------------------------------------------------>
            <div class="p-5  space-y-5">
                <div>
                    <Button @click="saveNewItem" label="Primary" class="w-full h-fit bg-primary hover:bg-accent ">
                        <p class="font-bold text-[20px]">Save</p>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>