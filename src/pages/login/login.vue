<script setup>
import { ref } from 'vue'

const email = ref('');
const password = ref('');
var loading = ref(false);
const User = ref({
    accountID: 0,
    accountType: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: email.value,
    password: password.value

});

const authUser = async () => {
    try {
        loading.value = true
        const response = await fetch(`https://universitycafeapi.vercel.app/api/accounts/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(
                {
                    email: email.value,
                    password: password.value
                }
            )
        })
        const data = await response.json()
        if (data) {
            User.value.accountID = data.AccountID
            User.value.accountType = data.AccountTypeID
            User.value.firstName = data.FirstName
            User.value.lastName = data.LastName
            User.value.phone = data.Phone
            console.log(User)
            console.log('Login successful')
        } else {
            console.log('Login failed')
        }
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class=" font-sora p-5 gap-y-[20%] h-screen flex flex-col items-center select-none">
        <div v-if="loading" class="fixed -top-[1px] w-full">
            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>
        <div class="flex items-center gap-2 text-clamp3 font-bold">
            <img class="w-12" src="\src\pages\login\assets\CAFE LOGO.png" alt="logo">
            <h1>University Cafe</h1>
        </div>
        <div class="flex flex-col gap-y-6 border-2 border-offwhite rounded-xl w-clamp1  p-5">
            <h1 class="text-clamp2 font-regular text-black">Log in</h1>
            <div class="space-y-5 ">
                <div class="flex flex-col gap-y-1">
                    <label for="username" class="text-[15px] font-regular text-darkgrey">Email</label>
                    <InputText type="text" v-model="email" />
                </div>
                <div class="flex flex-col gap-y-1">
                    <label for="password" class="text-[15px] font-regular text-darkgrey">Password</label>
                    <Password v-model="password" :feedback="false" variant="filled" />
                </div>
                <Button label="Primary" @click="authUser"
                    class="text-[15px] font-regular text-white bg-primary active:bg-accent w-full h-[45px]">Log
                    in</Button>
            </div>
            <div class="border-t-[2px] border-darkwhite">
                <div class="flex items-center justify-between pt-5">
                    <p>Don't have an account?</p>
                    <Button label="Primary" class="h-[40px] gap-2 border-2 text-black active:bg-secondary ">
                        <p class="text-black">Sign up</p>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>