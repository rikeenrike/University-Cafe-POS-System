<script setup>
import { ref, onMounted } from "vue";
import { UserOrder } from "/src/db/dummydb.js";
import basket from "./cashier_basket.vue";

const fetchOrder = ref(UserOrder);
const addToCart = (item) => {
  if (!fetchOrder.value.find((i) => i.name === item.name)) {
    const newId = fetchOrder.value.length > 0 ? Math.max(...fetchOrder.value.map((c) => c.id)) + 1 : 1;
    const newItem = {
      id: newId,
      name: item.ProductName,
      price: item.UnitPrice,
      quantity: 1,
      total: item.UnitPrice,
    };
    fetchOrder.value.push(newItem);
    console.log(fetchOrder.value);
  } else {
    return;
  }
};

const products = ref([]);
const fetchsuccess = ref(true);
const fetchProducts = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/products/subcategories");
    products.value = await response.json();
    fetchsuccess.value = true;

  } catch (error) {
    console.error(error);
    fetchsuccess.value = false;
  }
}

onMounted(() => {
  fetchProducts();
});

</script>

<template>
  <div class="h-[80%] font-sora select-none relative pr-[0px] lg:pr-[20px] gap-[17px]">
    <!-- MENU -->
    <div class=" h-[100%] pb-[17%] mt-[1%] overflow-y-auto">
      <div v-if="fetchsuccess">
        <Accordion :activeIndex="[0, 1]" :multiple="true">
          <AccordionTab v-for="tab in products" :key="tab.id" :header="tab.header">
            <div class="-space-x-5 flex overflow-x-auto sm:space-x-1">

              <!-- item -->
              <div v-for="item in tab.items" :key="item.id" @click="addToCart(item)"
                class="flex items-center cursor-pointer">
                <div class="flex h-full justify-between flex-col items-center relative ">
                  <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                    class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center">

                  <div
                    class="flex justify-center items-center leading-none py-2  w-[175px] text-clamp4 font-regular text-center text-black ">
                    {{ item.ProductName }}
                  </div>
                  <div class="text-[12px]  font-semibold text-lightgrey">₱{{ item.UnitPrice }}.00
                  </div>
                </div>
              </div>

            </div>
          </AccordionTab>
        </Accordion>
      </div>
      <div v-else class="text-[30px] font-bold text-black text-center">
        <h1>No items found</h1>
        <h2>Please Refresh the Page</h2>
      </div>
    </div>
  </div>
</template>