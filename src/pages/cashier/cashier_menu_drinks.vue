<script setup>
import { ref } from "vue";
const selectedfilter = ref();
const filterOnSide = ref(false);
const value1 = ref("");
const filter = ref([
  { filter: "Favorites", icon: "ph:heart-fill", value: "Left" },
  { filter: "Bestsellers", icon: "ph:seal-check-fill", value: "Right" },
]);
const tabs = ref([
  {
    id: 1,
    name: "hotcoffees",
    header: "Hot Coffees",
    items: [
      { id: 1, name: "Caffe Americano", price: 60, isBestseller: true },
      { id: 2, name: "Caffe Latte", price: 75, isBestseller: false },
      { id: 3, name: "Coffee Cappuccino", price: 65, isBestseller: false },
      { id: 4, name: "Latte Macchiato", price: 75, isBestseller: true },
      { id: 5, name: "Caffe Mocha", price: 80, isBestseller: false },
    ],
  },
  {
    id: 2,
    name: "flavoredcoffees",
    header: "Flavored Coffees",
    items: [
      { id: 1, name: "Caramel Macchiato", price: 80, isBestseller: false },
      { id: 2, name: "Mocha Chocolate", price: 80, isBestseller: false },
    ],
  },
  {
    id: 3,
    name: "milkteas",
    header: "Milk Teas",
    items: [
      { id: 1, name: "Wintermelon", price: 45, isBestseller: false },
      { id: 2, name: "Okinawa", price: 45, isBestseller: true },
      { id: 3, name: "Mango", price: 45, isBestseller: true },
      { id: 4, name: "Oreo", price: 45, isBestseller: true },
      { id: 5, name: "Caramel", price: 45, isBestseller: false },
      { id: 6, name: "Chocolate", price: 50, isBestseller: false },
    ],
  },
  {
    id: 4,
    name: "blendedfrappes",
    header: "Blended Frappes",
    items: [
      { id: 1, name: "Strawberry", price: 85, isBestseller: false },
      { id: 2, name: "Cookies n Cream", price: 85, isBestseller: false },
      { id: 3, name: "Mocha", price: 85, isBestseller: true },
      { id: 4, name: "Ube", price: 85, isBestseller: true },
      { id: 5, name: "Chocolate", price: 90, isBestseller: false },
      { id: 6, name: "Mango", price: 85, isBestseller: true },
    ],
  },
  {
    id: 5,
    name: "icedcoffees",
    header: "Iced Coffees",
    items: [
      { id: 1, name: "Cafe Latte", price: 75, isBestseller: true },
      { id: 2, name: "Caramel Macchiato", price: 85, isBestseller: false },
      { id: 3, name: "Cafe Mocha", price: 85, isBestseller: true },
      { id: 4, name: "Cafe Americano", price: 70, isBestseller: false },
      { id: 5, name: "Cappuccino", price: 85, isBestseller: false },
    ],
  },
  {
    id: 6,
    name: "chocolates",
    header: "Chocolates",
    items: [
      { id: 1, name: "Hot Chocolate", price: 60, isBestseller: true },
      { id: 2, name: "Cold Chocolate", price: 70, isBestseller: false },
    ],
  },
  {
    id: 7,
    name: "freshjuices",
    header: "Fresh Juices",
    items: [
      { id: 1, name: "Apple", price: 55, isBestseller: true },
      { id: 2, name: "Carrot", price: 55, isBestseller: false },
      { id: 3, name: "Mango", price: 55, isBestseller: false },
      {
        id: 4,
        name: "Apple Carrot (Double Fruit)",
        price: 70,
        isBestseller: false,
      },
    ],
  },
]);
</script>

<template>
    <div class="h-[80%] font-sora select-none relative pr-[0px] lg:pr-[20px] gap-[17px]">
        <!-- MENU -->
        <div class=" h-[100%] pb-[17%] mt-[1%] overflow-y-auto">
            <div v-if="tabs && tabs.length">
                <Accordion :activeIndex="[0, 1]" :multiple="true">
                    <AccordionTab v-for="tab in tabs" :key="tab.id" :header="tab.header">
                        <div class="-space-x-5 flex overflow-x-auto sm:space-x-1">
                            <div v-for="item in tab.items" :key="item.id" class="flex items-center cursor-pointer">
                                <div class="flex h-full justify-between flex-col items-center relative ">
                                    <img src="\src\pages\cashier\assets\images.jpg" alt="coffee"
                                        class="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover object-center">
                                    <div v-if="item.isBestseller"
                                        class="absolute top-[50px] left-[110px]  sm:top-[75px] sm:left-[110px]"
                                        v-tooltip="'Bestseller'" type="text" placeholder="Right">
                                        <Icon icon="ph:seal-check-fill" width="25px" height="25px"
                                            style="color: #fc5185" class="w-[15px] h-[15px] sm:w-[25px] sm:h-[25px]" />
                                    </div>
                                    <div
                                        class="flex justify-center items-center leading-none py-2  w-[175px] text-clamp4 font-regular text-center text-black ">
                                        {{ item.name }}
                                    </div>
                                    <div class="text-[12px]  font-semibold text-lightgrey">₱{{ item.price }}.00
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