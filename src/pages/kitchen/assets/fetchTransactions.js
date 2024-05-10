import { ref } from "vue";
import axios from "axios";
import { drinksproducts, foodsproducts } from "../../cashier/scripts/fetchProducts";
export let ongoingOrders = ref([]);
export let readyOrders = ref([]);
export const loading = ref(true);
export const fetchsuccess = ref(false);

export const fetchOrders = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/transactions/kitchen/statusgetter`);
        const data = response.data;

        ongoingOrders.value = data.filter(order => order.Status === 1);
        readyOrders.value = data.filter(order => order.Status === 2);
        console.log(ongoingOrders.value);
        fetchsuccess.value = true;
    } catch (error) {
        console.error(error);
        fetchsuccess.value = false;
    } finally {
        loading.value = false;
    }
}

export const updateOrderStatus = async (TransID, StatusID, items) => {
    try {
        console.log(TransID, StatusID, items);
        const response = await axios.put(`http://127.0.0.1:8000/api/transactions/${TransID}/${StatusID}/statussetter`);
        if (StatusID === 5) {
                items.forEach((order) => {
                    let productFound = false;
                    drinksproducts.value.forEach((subcategory) => {
                        subcategory.items.forEach((product) => {
                            if (order.ProductID === product.ProductID) {
                                product.Stock += order.Qty;
                                productFound = true;
                                console.log(product.Stock);
                            }
                        });
                    });

                    foodsproducts.value.forEach((subcategory) => {
                        subcategory.items.forEach((product) => {
                            if (order.ProductID === product.ProductID) {
                                product.Stock += order.Qty;
                                console.log(product.Stock);
                            }
                        });
                    });

                });
            console.log(drinksproducts.value);
            console.log(foodsproducts.value);
        }
    } catch (error) {
        console.error(error);
    }
}

export const objectpasser = (TransID, StatusID) => {
    if (StatusID === 2) {
        const order = ongoingOrders.value.find(order => order.TransID === TransID);
        ongoingOrders.value = ongoingOrders.value.filter(order => order.TransID !== TransID);
        readyOrders.value.push(order);
    }
    if (StatusID === 3 || StatusID === 5) {
        ongoingOrders.value = ongoingOrders.value.filter(order => order.TransID !== TransID);
        readyOrders.value = readyOrders.value.filter(order => order.TransID !== TransID);
    }
}

export const fetchLatestOrder = async (ongoingOrders) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/transactions/latest`);
        ongoingOrders.value.push(response.data[0]);
    } catch (error) {
        console.error(error);
    }
}