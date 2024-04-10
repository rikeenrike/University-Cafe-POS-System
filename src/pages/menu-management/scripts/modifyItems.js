import { ref } from 'vue'
import gsap from "gsap";

export const itemData = ref({})

export const newItem = ref({
    ProductName: "",
    UnitPrice: "",
    Stock: 0,
    isBestSeller: false,
    isDisabled: false, 
    SubCateID: 0,
})

export const editItem = (item) => {
    itemData.value = item
    console.log(itemData.value)
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


export const addItem = () => {

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