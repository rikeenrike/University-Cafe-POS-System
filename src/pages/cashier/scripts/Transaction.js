import { ref } from 'vue';

export const Orders = ref([]);

export const addToCart = (item) => {
    const existingItem = Orders.value.find((i) => i.name === item.ProductName);
    if (!existingItem) {
        const newItem = {
            ProductID: item.ProductID,
            name: item.ProductName,
            price: item.UnitPrice,
            quantity: 1,
            Subtotal: item.UnitPrice,
        };
        Orders.value.push(newItem);
    } else {
        existingItem.quantity += 1;
        existingItem.Subtotal = existingItem.price * existingItem.quantity;
    }
};
