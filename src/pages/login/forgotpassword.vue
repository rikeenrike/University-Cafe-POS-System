<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from "primevue/usetoast";


const toast = useToast();

const router = useRouter()

const email = ref('');
const password = ref('');
const password2 = ref('');
let err = ref(false);
var loading = ref(false);

const showEmail = ref(true);
const showPassword = ref(false);

const AccountID = ref();

const authUser = async () => {
    if (email.value === '') {
        toast.add({ severity: "error", summary: "Error", detail: "Please fill in all fields", group: 'bc', life: 2000 });
        err = true;
        return
    }
    err= false
    try {
        loading.value = true
        const response = await axios.get(`http://127.0.0.1:8000/api/verify/email/${email.value}`, {
            withCredentials: true
        })
        const data = await response.data;
        AccountID.value = data.AccountID         
        if (data) {
            showEmail.value = false;
            showPassword.value = true;
        } 
    } catch (error) {
        if (error.response && error.response.status === 404) {
            toast.add({ severity: "error", summary: "Error", detail: "Account with Email Does not exists", group: 'bc', life: 2000 });
            err = true;
        }
    } finally {
        loading.value = false
    }
}

const changePass = async () => {
    if (password.value === '' || password2.value === '') {
        toast.add({ severity: "error", summary: "Error", detail: "Please fill in all fields", group: 'bc', life: 2000 });
        return
    }

    if (password.value !== password2.value) {
        toast.add({ severity: "error", summary: "Error", detail: "Passwords do not match", group: 'bc', life: 2000 });
        return
    }

    try {
        loading.value = true
        const response = await axios.post(`http://127.0.0.1:8000/api/change/password`, {
            AccountID: AccountID.value,
            password: password.value
        }, {
            withCredentials: true
        })
        const data = await response.data;
        if (data) {
            toast.add({ severity: "success", summary: "Success", detail: "Password Change Successful", group: 'bc', life: 2000 });
            email.value = '';
            password.value = '';
            password2.value = '';
            router.push('/')
        }
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
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
            <h1 class="text-clamp2 font-regular text-black">Enter Email</h1>
            <div class="space-y-5 ">
                <div v-if="showEmail" class="flex flex-col gap-y-1">
                    <label for="username" class="text-[15px] font-regular text-darkgrey">Email</label>
                    <InputText type="text" v-model="email" :invalid="err" />
                </div>
                <div v-if="showPassword" class="flex flex-col gap-y-1">
                    <label for="password" class="text-[15px] font-regular text-darkgrey">Password</label>
                    <Password v-model="password" :feedback="false" variant="filled" :invalid="err" />

                    <label for="password" class="text-[15px] font-regular text-darkgrey">Confirm Password</label>
                    <Password v-model="password2" :feedback="false" variant="filled" :invalid="err" />
                </div>
                <Button v-if="showEmail" label="Primary" @click="authUser"
                    class="text-[15px] font-regular text-white bg-primary active:bg-accent w-full h-[45px]">Enter</Button>
                <Button v-if="showPassword" label="Primary" @click="changePass"
                    class="text-[15px] font-regular text-white bg-primary active:bg-accent w-full h-[45px]">Enter</Button>
            </div>
            <div class="border-t-[2px] border-darkwhite">
                <div class="flex items-center justify-between pt-5">

                    <Button @click="router.push('/')" label="Primary"
                        class="h-[40px] gap-2 border-2 text-black active:bg-secondary ">
                        <p class="text-black">Back to login</p>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>