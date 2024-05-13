<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from "primevue/usetoast";


const toast = useToast();

const router = useRouter()

const Email = ref('');
const FirstName = ref('');
const LastName = ref('');
const UserPass = ref('');
const err = ref(false);
var loading = ref(false);

const authUser = async () => {
    if (Email.value === '' || UserPass.value === '' || FirstName.value === '' || LastName.value === '') {
        toast.add({ severity: "error", summary: "Error", detail: "Please fill in all fields", group: 'bc', life: 2000 });
        return
    }

    try {
        loading.value = true
        const response = await axios.post(`http://127.0.0.1:8000/api/accounts/register`, {
            AccountTypeID: 2,
            Email : Email.value,
            FirstName : FirstName.value,
            LastName : LastName.value,
            Password: UserPass.value
        }, {
            withCredentials: true
        })
        const data = await response.data;
        if (data) {
            toast.add({ severity: "success", summary: "Success", detail: "Account Creation Successful", group: 'bc', life: 2000 });
            router.push('/')
        } 
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.add({ severity: "error", summary: "Error", detail: "Account with Email already exists", group: 'bc', life: 2000 });
            err = true;
        }
    } finally {
        loading.value = false
        Email.value = '';
        UserPass.value = '';
        FirstName.value = '';
        LastName.value = '';
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
            <h1 class="text-clamp2 font-regular text-black">Register</h1>
            <div class="space-y-5 ">
                <div class="flex flex-col gap-y-1">
                    <label for="username" class="text-[15px] font-regular text-darkgrey">Email</label>
                    <InputText type="text" v-model="Email" :invalid="err" />
                </div>
                <div class="flex flex-col gap-y-1">
                    <label for="username" class="text-[15px] font-regular text-darkgrey">First Name</label>
                    <InputText type="text" v-model="FirstName" :invalid="err" />
                </div>
                <div class="flex flex-col gap-y-1">
                    <label for="username" class="text-[15px] font-regular text-darkgrey">Last Name</label>
                    <InputText type="text" v-model="LastName" :invalid="err" />
                </div>
                <div class="flex flex-col gap-y-1">
                    <label for="password" class="text-[15px] font-regular text-darkgrey">Password</label>
                    <Password v-model="UserPass" :feedback="false" variant="filled" :invalid="err" />
                </div>
                <Button label="Primary" @click="authUser"
                    class="text-[15px] font-regular text-white bg-primary active:bg-accent w-full h-[45px]">Create
                    Account</Button>
            </div>
            <div class="border-t-[2px] border-darkwhite">
                <div class="flex items-center justify-between pt-5">
                    <p>Already Have an Account?</p>
                    <Button @click="router.push('/')" label="Primary"
                        class="h-[40px] gap-2 border-2 text-black active:bg-secondary ">
                        <p class="text-black">Login in</p>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>