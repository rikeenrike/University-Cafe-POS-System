<script setup>
import { ref, onMounted } from 'vue'

let dates = ref()
const getDateString = () => {
    if (dates.value[0] instanceof Date) {
        return dates.value[0].toISOString().slice(0, 10);
    }
    return null;
}
</script>





<template>

    <div
        class="px-5 relative md:px-[43px] lg:grid lg:grid-cols-[2fr,2fr] xl:grid-cols-[2fr,.8fr] font-sora select-none top-[80px] h-[calc(100vh-80px)] overflow-hidden">
        <div class="bg-red-100 h-full w-full rounded-lg shadow-lg">
            <p class="text-[32px] font-bold">Sales</p>
            <div class="bg-yellow-100 h-full w-full rounded-lg shadow-lg p-5">
                <p class="text-[24px] font-bold">Filter By:</p>
                <Calendar v-model="dates" selectionMode="range" :manualInput="false" showButtonBar />
                <Button @click="console.log(getDateString())">Enter</Button>
            </div>
        </div>
        <div class="bg-blue-100 h-full w-full rounded-lg shadow-lg">

        </div>
    </div>
</template>