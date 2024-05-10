import { ref } from "vue";
import axios from "axios";
export const drinksproducts = ref([]);
export const foodsproducts = ref([]);
export const loading = ref(true);
export const fetchsuccess = ref(true);

export const fetchDrinksProducts = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/products/maincategories/1");
        drinksproducts.value = response.data;   
        fetchsuccess.value = true;
        console.log(drinksproducts.value)
    } catch (error) {
        console.error(error);
        fetchsuccess.value = false;
    } finally {
        loading.value = false;
    }
}

export const fetchFoodsProducts = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/products/maincategories/2");
        foodsproducts.value = response.data;
        console.log(foodsproducts.value)
        fetchsuccess.value = true;
    } catch (error) {
        console.error(error);
        fetchsuccess.value = false;
    } finally {
        loading.value = false;
    }
}

export var productdata = ref([]);
export const fetchproducts = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        productdata.value = response.data;
    } catch (error) {
        console.log(error);
    }
};

