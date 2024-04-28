import { ref } from "vue";
import axios from "axios";

export const ongoingOrders = ref([]);
export const readyOrders = ref([]);
export const loading = ref(true);
export const fetchsuccess = ref(false);

export const fetchOrders = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/transactions/kitchen/statusgetter`);
        const data = response.data;

        ongoingOrders.value = data.filter(order => order.Status === 1);
        readyOrders.value = data.filter(order => order.Status === 2);

        fetchsuccess.value = true;
    } catch (error) {
        console.error(error);
        fetchsuccess.value = false;
    } finally {
        loading.value = false;
    }
}

export const updateOrderStatus = async (TransID, StatusID) => {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/transactions/${TransID}/${StatusID}/statussetter`);
    } catch (error) {
        console.error(error);
    }
}


