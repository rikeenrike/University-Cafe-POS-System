import { ref } from 'vue';

export const UserOrder = ref([]);

export const addToCart = (item) => {
    if (!UserOrder.value.find((i) => i.ProducName === item.ProducName)) {
        const newItem = {
            ProductID: item.ProductID,
            name: item.ProductName,
            price: item.UnitPrice,
            quantity: 1,
            Subtotal: item.UnitPrice,
        };
        UserOrder.value.push(newItem);
        console.log(UserOrder.value);
    } else {
        const existingItem = UserOrder.value.find((i) => i.name === item.ProductName);
        existingItem.quantity += 1;
        existingItem.Subtotal = existingItem.price * existingItem.quantity;
        return;
    }
};
