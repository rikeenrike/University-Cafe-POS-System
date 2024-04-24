import { ref } from "vue";
import axios from "axios";
export const drinksproducts = ref([]);
export const foodsproducts = ref([]);
export const loading = ref(true);
export const fetchsuccess = ref(true);

export const fetchDrinksProducts = async () => {
    try {
        const response = await axios.get("https://universitycafeapi.vercel.app/api/products/maincategories/1");
        drinksproducts.value = response.data;
        fetchsuccess.value = true;
    } catch (error) {
        console.error(error);
        fetchsuccess.value = false;
    } finally {
        loading.value = false;
    }
}

export const fetchFoodsProducts = async () => {
    try {
        const response = await axios.get("https://universitycafeapi.vercel.app/api/products/maincategories/2");
        foodsproducts.value = response.data;
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
        const response = await axios.get("https://universitycafeapi.vercel.app/api/products");
        productdata.value = response.data;
    } catch (error) {
        console.log(error);
    }
};

