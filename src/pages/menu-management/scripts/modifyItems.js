import { ref } from 'vue'
import gsap from "gsap";

export const loading = ref(false);

//Edit Item
export const itemData = ref({})
export const editItem = (item) => {
    itemData.value = item;
    OpenPopup(".edit", ".editwrapper")
};

//Add Item
export const newItem = ref({
    ProductName: "",
    UnitPrice: 0,
    Stock: 0,
    SubCateID: 0,
    isBestSeller: 0,
    isDisabled: 0,
    image : null,
})

export const addItem = (subid) => {
    newItem.value.SubCateID = subid.SubCateID;
    OpenPopup(".add", ".addwrapper");
};

//Subcategory
export const newSubCategory = ref({
    SubCategory : "",
    MainCateID : 0,
})
export const addSub = (mainid) => {
    newSubCategory.value.MainCateID = mainid;
    OpenPopup(".addsub", ".addsubwrapper");
};  

export const subData = ref({})
export const editSub = (sub) => {  
    OpenPopup(".editsub", ".editsubwrapper");
    subData.value = sub;
}

//Animations
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

export const OpenPopup = (target1, target2) => {
    gsap.to(target1, {
        x: -10,
        opacity: 1,
        duration: .5,
        ease: "power4.out",
        stagger: 0.2,

    });
    gsap.to(target2, {
        x: 0,
        opacity: 1,
        duration: .5,
        ease: "power4.out",
        display: "flex",
        backdropFilter: "blur(5px)",
    });
};