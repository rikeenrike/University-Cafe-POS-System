<script setup>
import { ref } from 'vue'
import { ClosePopup, subData, loading } from "./scripts/modifyItems";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const toast = useToast();
const isInputValid = ref(false);
const saveEdit = async () => {
    if (subData.value.SubCategory === "") {
        isInputValid.value = true;
        toast.add({ severity: "error", summary: "Error", detail: "Please fill in all fields", group: 'bc', life: 2000 });
        return;
    } else {
        isInputValid.value = false;
    }
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/product_sub_category_edit/${subData.value.SubCateID}/${subData.value.SubCategory}`);
        if (response) {
            const data = await response.data;
            console.log(data);
            toast.add({ severity: 'success', summary: 'Subcategory Added!', detail: 'Subcategory has been successfully added', group: 'bc', life: 2000 });
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        toast.add({ severity: "error", summary: "Error", detail: "Changes were not made", group: 'bc', life: 2000 });
        console.error(error);
    }
    ClosePopup(".editsub", ".editsubwrapper")
}  

const disableItem = () => {
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        message: 'This will disable the product and will not be displayed on the menu. Please confirm to proceed.',
        accept: async () => {
            loading.value = true;
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/product_sub_cutegory/disable/${subData.value.SubCateID}`);
                if (response) {
                    const data = await response.data;
                    console.log(data);
                    toast.add({ severity: 'success', summary: 'Item Disabled!', detail: 'Item has been successfully disabled', group: 'bc', life: 2000 });
                } else {
                    throw new Error('Request failed');
                }
            } catch (error) {
                console.error(error);
                toast.add({ severity: "error", summary: "Error", detail: "Changes were not made", group: 'bc', life: 2000 });
            } finally {
                loading.value = false;
            }
            ClosePopup(".edit", ".editsubwrapper")
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const reenableItem = () => {
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        message: 'This will re-enable the product and will be displayed on the menu. Please confirm to proceed.',
        accept: async () => {
            loading.value = true;
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/product_sub_category/enable/${subData.value.SubCateID}`);
                if (response) {
                    const data = await response.data;
                    console.log(data);
                    toast.add({ severity: 'success', summary: 'Item Re-enabled!', detail: 'Item has been successfully re-enabled', group: 'bc', life: 2000 });
                } else {
                    throw new Error('Request failed');
                }
            } catch (error) {
                console.error(error);
                toast.add({ severity: "error", summary: "Error", detail: "Changes were not made", group: 'bc', life: 2000 });
            } finally {
                loading.value = false;
            }
            ClosePopup(".edit", ".editsubwrapper")
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
</script>

<template>
    <div class="editsubwrapper hidden items backdrop-blur-[0px] justify-end items-center pr-0 h-screen w-screen font-sora select-none
        sm:pr-5">
        <div @click="ClosePopup('.editsub', '.editsubwrapper'); isInputValid = false"
            class=" fixed h-screen w-screen flex-grow hidden sm:block">
        </div>
        <div class="py-5 hidden sm:flex">
            <div class="editsub shadow-2xl flex flex-col w-[500px] bg-white opacity-0  rounded-[30px] overflow-hidden">
                <!-- TOP ------------------------------------------------>
                <div class="flex items-center justify-between border-b-2 px-10 py-5">
                    <h1 class="font-bold text-[24px]">Edit subcategory</h1>
                    <Button label="Primary" @click="ClosePopup('.editsub', '.editsubwrapper'); isInputValid = false"
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
                        <InputText size="large" v-model="subData.SubCategory" placeholder="Sub Category Name"
                            :invalid="isInputValid" />
                    </div>
                </div>
                <!-- BOTTOM ------------------------------------------------>
                <div class="px-10 my-10 space-y-5">
                    <div class="flex justify-between items-center">
                        <Button label="Primary" @click="saveEdit()" class="px-6 h-fit bg-primary hover:bg-accent ">
                            <p class="font-bold text-[20px]">Save</p>
                        </Button>
                        <Button v-if="!subData.isDisabled" @click="disableItem" label="Primary"
                            class="group flex flex-col bg-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                            <p class="text-darkgrey text-[14px] group-hover:text-accent">Disable Item</p>
                        </Button>
                        <Button v-else @click="reenableItem" label="Primary" class="group flex flex-col bg-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                            <p class="text-darkgrey text-[14px] group-hover:text-accent">Re-enable Item</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>


        <!-- MOBILE PHONE ------------------------------------->
        <div class="border-2 flex flex-col justify-around flex-grow bg-white  sm:hidden">
            <!-- TOP ------------------------------------------------>
            <div class="flex items-center justify-between px-5 py-5">
                <h1 class="font-bold text-[24px]">Edit Sub Category</h1>
                <Button label="Primary" @click="ClosePopup('.editsub', '.editsubwrapper')"
                    class="bg-white hover:bg-offwhite duration-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </Button>
            </div>
            <!-- MIDDLE ------------------------------------------------>
            <div class="p-5 font-bold text-clamp4   h-3/5 overflow-y-auto">
                <div class="py-5">
                    <label class="text-[14px] font-semibold">Sub Category Name</label>
                    <InputText size="large" v-model="subData.SubCategory" placeholder="Sub Category Name"
                        :invalid="isInputValid" />
                </div>
            </div>
            <!-- BOTTOM ------------------------------------------------>
            <div class="p-5 space-y-5 ">
                <div class="flex justify-between items-center">
                    <Button label="Primary" @click="saveEdit()" class="px-6 h-fit bg-primary hover:bg-accent ">
                        <p class="font-bold text-[20px]">Save</p>
                    </Button>
                    <Button v-if="!subData.isDisabled" @click="disableItem" label="Primary"
                        class="group flex flex-col bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                        <p class="text-darkgrey text-[14px] group-hover:text-accent">Disable Item</p>
                    </Button>
                    <Button v-else @click="reenableItem" label="Primary" class="group flex flex-col bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            class="w-[24px] h-[24px] stroke-darkgrey group-hover:stroke-accent">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                        <p class="text-darkgrey text-[14px] group-hover:text-accent">Re-enable Item</p>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>