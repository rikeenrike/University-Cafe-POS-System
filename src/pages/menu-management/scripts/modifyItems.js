import { ref } from 'vue'
import gsap from "gsap";
import axios from "axios";
export const loading = ref(false);
export const itemData = ref({})

export const newItem = ref({
    ProductName: "",
    UnitPrice: "",
    Stock: 0,
    SubCateID: 0,
})

export const newSubCategory = ref({
    SubCategory : "",
    MainCateID : 1,
})

export const editItem = (item) => {
    itemData.value = JSON.parse(JSON.stringify(item));
    gsap.to(".edit", {
        x: -10,
        opacity: 1,
        duration: .5,
        ease: "power4.out",
        stagger: 0.2,

    });
    gsap.to(".editwrapper", {
        x: 0,
        opacity: 1,
        duration: .5,
        ease: "power4.out",
        display: "flex",
        backdropFilter: "blur(5px)",
    });
};

export const saveeditItem = async () => {
    console.log(itemData.value)
    try {
        const response = await axios.put("http://127.0.0.1:8000/api/products/update", itemData.value, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        loading.value = true
        const data = await response.data
        console.log(data)
    } catch (error) {
        console.error(error.response.data);
    } finally {
        loading.value = false
    }
    ClosePopup(".edit", ".editwrapper")
};

export const addItem = (subid) => {
    newItem.value.SubCateID = subid.SubCateID;
    console.log(newItem.value)
    gsap.to(".add", {
        x: -10,
        opacity: 1,
        duration: .5,
        ease: "power4.out",
        stagger: 0.2,

    });
    gsap.to(".addwrapper", {
        x: 0,
        opacity: 1,
        duration: .5,
        ease: "power4.out",
        display: "flex",
        backdropFilter: "blur(5px)",
    });
};

export const saveNewItem = () => {
    try{
        const response = axios.post("http://127.0.0.1:8000/api/products/add", newItem.value, {
        })
    }catch{
        console.error(error.response.data);
    }finally{
        loading.value = false
    }

}

export const addSubcategory = () => {

    console.log(newSubCategory.value)
    try {
        const response = axios.post("http://127.0.0.1:8000/api/product_sub_category/create", newSubCategory.value, {
        })
    } catch (error) {
        console.error(error.response.data);
    }
}   

export const addSubItem = () => {
    gsap.to(".addsub", {
        x: -10,
        opacity: 1,
        duration: .5,
        ease: "power4.out",
        stagger: 0.2,

    });
    gsap.to(".addsubwrapper", {
        x: 0,
        opacity: 1,
        duration: .5,
        ease: "power4.out",
        display: "flex",
        backdropFilter: "blur(5px)",
    });
}

export const ClosePopup = ( target1, target2 ) => {
    gsap.to(target1, {
        x: 10,
        opacity: 0,
        duration: .5,
        ease: "power4.out",
        stagger: 0.2,

    });
    gsap.to(target2, {
        x: 0,
        opacity: 0,
        duration: .5,
        ease: "power4.out",
        display: "none",
        backdropFilter: "blur(0px)",
    });
};