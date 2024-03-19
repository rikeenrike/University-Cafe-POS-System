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
    name: "appetizers",
    header: "Appetizers",
    items: [
      { id: 1, name: "Bruschetta", price: 10, isBestseller: true },
      { id: 2, name: "Caprese Salad", price: 12, isBestseller: false },
      { id: 3, name: "Mozzarella Sticks", price: 8, isBestseller: false },
      { id: 4, name: "Chicken Wings", price: 9, isBestseller: true },
      { id: 5, name: "Stuffed Mushrooms", price: 11, isBestseller: false },
    ],
  },
  {
    id: 2,
    name: "maincourses",
    header: "Main Courses",
    items: [
      { id: 1, name: "Grilled Salmon", price: 18, isBestseller: true },
      { id: 2, name: "Steak Frites", price: 22, isBestseller: false },
      { id: 3, name: "Pasta Primavera", price: 16, isBestseller: false },
      { id: 4, name: "Chicken Parmesan", price: 20, isBestseller: true },
      { id: 5, name: "Vegetable Stir-Fry", price: 15, isBestseller: false },
    ],
  },
  {
    id: 3,
    name: "desserts",
    header: "Desserts",
    items: [
      { id: 1, name: "Chocolate Lava Cake", price: 8, isBestseller: true },
      { id: 2, name: "Cheesecake", price: 7, isBestseller: false },
      { id: 3, name: "Tiramisu", price: 9, isBestseller: false },
      { id: 4, name: "Fruit Tart", price: 6, isBestseller: true },
      { id: 5, name: "Creme Brulee", price: 10, isBestseller: false },
    ],
  },
  {
    id: 4,
    name: "sides",
    header: "Sides",
    items: [
      { id: 1, name: "French Fries", price: 5, isBestseller: true },
      { id: 2, name: "Onion Rings", price: 6, isBestseller: false },
      { id: 3, name: "Garlic Bread", price: 4, isBestseller: false },
      { id: 4, name: "Side Salad", price: 6, isBestseller: true },
      { id: 5, name: "Sweet Potato Fries", price: 7, isBestseller: false },
    ],
  },
  {
    id: 5,
    name: "drinks",
    header: "Drinks",
    items: [
      { id: 1, name: "Soda", price: 3, isBestseller: true },
      { id: 2, name: "Iced Tea", price: 3, isBestseller: false },
      { id: 3, name: "Lemonade", price: 4, isBestseller: false },
      { id: 4, name: "Milkshake", price: 5, isBestseller: true },
      { id: 5, name: "Smoothie", price: 6, isBestseller: false },
    ],
  },
]);
</script>

<template>
    <div class="h-[80%] font-sora select-none relative pr-[0px] lg:pr-[20px] gap-[17px]">
        <!-- MENU -->
        <div class="h-[100%] pb-[17%] mt-[1%] overflow-y-auto">
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