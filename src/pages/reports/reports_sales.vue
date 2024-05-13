<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import moment from 'moment'
import { useToast } from "primevue/usetoast";
import axios from 'axios';
const toast = useToast();

let Fromdate = ref(null); // initialize Fromdate to a Date object
let Todate = ref(null)

let products = ref();
let totalsales = ref(0);
let totaltransactions = ref(0);

let err = false;

const querySales = async () => {
    
    let date1 = ref("none")
    let date2 = ref("none")
    products.value = null;
    totalsales.value = 0;
    totaltransactions.value = 0;

    if (Fromdate.value !== null) {
        date1.value = `${Fromdate.value.getFullYear()}-${(Fromdate.value.getMonth() + 1).toString().padStart(2, '0')}-${Fromdate.value.getDate().toString().padStart(2, '0')}`;
        err = false;
    } else {
        toast.add({ severity: "error", summary: "Error", detail: "Please fill in all fields", group: 'bc', life: 2000 });
        err = true;
        return
    }
    if (Todate.value !== null) {
        date2.value = `${Todate.value.getFullYear()}-${(Todate.value.getMonth() + 1).toString().padStart(2, '0')}-${Todate.value.getDate().toString().padStart(2, '0')}`;
    }

    if (date1.value > date2.value) {
        toast.add({ severity: "error", summary: "Error", detail: "From date cannot be greater than To date", group: 'bc', life: 2000 });
        return
    }else if (date1.value === date2.value) {
        toast.add({ severity: "error", summary: "Error", detail: "From date cannot be equal to To date", group: 'bc', life: 2000 });
        return
    }
    
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/reports/getter/${date1.value}/${date2.value}`);
        if (response.data.length === 0) {
            toast.add({ severity: "error", summary: "Error", detail: "No data found, Please Enter Another Date", group: 'bc', life: 5000 });
            return
        }
        products.value = response.data;
        
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/total/sales/${date1.value}/${date2.value}`);
            const data = response.data;
            totalsales.value = data[0].TotalSales;
    
            try {
                const response = await  axios.get(`http://127.0.0.1:8000/api/total/transactions/${date1.value}/${date2.value}`);
                const data = response.data;
                totaltransactions.value = data[0].TotalTransactions;
            }catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }catch (error) {
        console.log(error)
    }finally{
        date1.value = "none"
        date2.value = "none"
    }

}

const windowWidth = ref(window.innerWidth);

const onResize = () => {
    windowWidth.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener('resize', onResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
});

const isDesktop = computed(() => windowWidth.value >= 1024);

const isMobile = computed(() => windowWidth.value > 800);


</script>


<template>
    <div class="px-5 relative md:px-[43px] font-sora select-none top-[80px] h-[calc(100vh-80px)] overflow">
        <div class="flex flex-col gap-2 h-full">
            <p class="text-[40px] font-bold mb-5">Sales</p>
            <div class="p-5 border-2 rounded-xl ">
                <p class="text-[24px] font-bold">Filter By:</p>
                <div class="flex flex-col  sm:flex-row sm:items-center gap-2">
                    <p>From</p>
                    <Calendar v-model="Fromdate" :manualInput="false" showButtonBar :invalid="err" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 hidden sm:block">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                    <p>To</p>
                    <Calendar v-model="Todate" :manualInput="false" showButtonBar 
                        :disabled="!Fromdate" />
                    <Button @click="querySales()" class="" severity="secondary">Calculate</Button>
                </div>
                <div class="overflow-scroll h-[calc(100vh-500px)] mt-5">
                    <DataTable :value="products" scrollable removableSort tableStyle="min-width: 50rem" paginator :rows="10"
                        :rowsPerPageOptions="[5, 10, 15]">
                        <Column field="ProductName" header="Product Name" sortable class="w-[30%] md:w-auto">
                            <template #body={data}>
                                <p class="font-bold"> {{ data.ProductName }}</p>
                            </template>
                        </Column>
                        <Column v-if="isDesktop" field="SubCategory" header="Sub Category" sortable>
                        </Column>
                        <Column v-if="isDesktop" field="UnitPrice" header="Unit Price" sortable>
                            <template #body={data}>
                                <p class="font-bold">₱ {{ data.UnitPrice }}</p>
                            </template>
                        </Column>
                        <Column v-if="isDesktop" field="Stock" header="Stock" sortable></Column>
                        <Column v-if="isMobile" field="ItemsSold" header="Items Sold" sortable></Column>
                        <Column field="Sales" header="Sales" sortable>
                            <template #body={data}>
                                <p class="font-bold text-primary">₱ {{ data.Sales }}</p>
                            </template>
                        </Column>
                        <template #empty>
                            <p class="text-center">No customers found. Please Enter Dates</p>
                        </template>
                        <template #loading>
                            <ProgressSpinner />
                        </template>
                    </DataTable>
                </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-5 items-center justify-center  w-full">
                <div class="flex flex-col justify-center h-[150px] w-[400px] bg-primary rounded-lg p-5">
                    <p class="text-clamp3    font-semibold text-center text-white">Completed Transactions</p>
                    <span class="flex justify-center items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                            class="w-clamp2">
                            <path
                                d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                        </svg>
                        <p class="text-clamp5 font-bold text-white text-center">{{ totaltransactions }}</p>
                    </span>
                </div>
                <div class="flex flex-col justify-center h-[150px] w-[400px] bg-secondary rounded-lg p-5">
                    <p class="text-clamp2 font-semibold text-center">Total Earnings</p>
                    <p class="text-clamp5 font-bold text-accent text-center">₱ {{ totalsales }}.00</p>
                </div>
            </div>
        </div>

    </div>
</template>