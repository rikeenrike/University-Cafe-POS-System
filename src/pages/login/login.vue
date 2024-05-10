<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from "primevue/usetoast";


const toast = useToast();

const router = useRouter()

const email = ref('');
const password = ref('');
let err = ref(false);
var loading = ref(false);

const authUser = async () => {
    if(email.value === '' || password.value === ''){
        toast.add({ severity: "error", summary: "Error", detail: "Please fill in all fields", group: 'bc', life: 2000 });
        return
    }

    try {
        loading.value = true
        const response = await axios.post(`http://127.0.0.1:8000/api/accounts/login`, {
            email: email.value,
            password: password.value
        },{
            withCredentials: true
        })
        const data = await response.data;
        if (data) {
            toast.add({ severity: "success", summary: "Success", detail: "Login Successful", group: 'bc', life: 2000 });
            router.push('/cashier')
        }else{
            toast.add({ severity: "error", summary: "Error", detail: "Invalid Credentials", group: 'bc', life: 2000 });
            err = true;
        }
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
        email.value = '';
        password.value = '';
    }
}
</script>

<template>
    <div class="z-20 font-sora p-5 gap-y-[20%] h-screen flex flex-col items-center select-none">
        <div v-if="loading" class="fixed -top-[1px] w-full">
            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>
        <div class="flex items-center gap-2 text-clamp3 font-bold">
            <img class="w-12" src="\src\pages\login\assets\CAFE LOGO.png" alt="logo">
            <h1>University Cafe Admin</h1>
        </div>
        <div class="flex flex-col gap-y-6 border-2 border-offwhite rounded-xl w-clamp1  p-5">
            <h1 class="text-clamp2 font-regular text-black">Log in</h1>
            <div class="space-y-5 ">
                <div class="flex flex-col gap-y-1">
                    <label for="username" class="text-[15px] font-regular text-darkgrey">Email</label>
                    <InputText type="text" v-model="email" :invalid="err" />
                </div>
                <div class="flex flex-col gap-y-1">
                    <label for="password" class="text-[15px] font-regular text-darkgrey">Password</label>
                    <Password v-model="password" :feedback="false" variant="filled" :invalid="err" />
                </div>
                <Button label="Primary" @click="authUser"
                    class="text-[15px] font-regular text-white bg-primary active:bg-accent w-full h-[45px]">Log
                    in</Button>
            </div>
            <!-- <div class="border-t-[2px] border-darkwhite">
                <div class="flex items-center justify-between pt-5">
                    <p>Don't have an account?</p>
                    <Button label="Primary" class="h-[40px] gap-2 border-2 text-black active:bg-secondary ">
                        <p class="text-black">Sign up</p>
                    </Button>
                </div>
            </div> -->
        </div>
    </div>
</template>