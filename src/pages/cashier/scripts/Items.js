import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
export const Orders = ref([]);

export const addToCart = (item) => {
    const existingItem = Orders.value.find((i) => i.ProductName === item.ProductName);
    if (!existingItem) {
        const newItem = {
            ProductID: item.ProductID,
            ProductName: item.ProductName,
            price: item.UnitPrice,
            quantity: 1,
            Subtotal: item.UnitPrice,
            Stock : item.Stock
        };        
        if(newItem.Stock <= 0){
            return;
        }
        newItem.Stock -= 1;
        Orders.value.push(newItem);
        console.log(Orders.value);
    } else {
        if (existingItem.Stock <= 0){
            return;
        }
        existingItem.Stock -= 1;
        existingItem.quantity += 1;
        existingItem.Subtotal = existingItem.price * existingItem.quantity;
        console.log(Orders.value);
    }
};
