


import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isActiveAnimation: JSON.parse(localStorage.getItem("animation") || "true"),
};


const bgAnimationSlice = createSlice({
    name: 'bgAnimation',
    initialState,
    reducers: {
        isBgAnimation(state) {
            state.isActiveAnimation = !state.isActiveAnimation;
            localStorage.setItem("animation", JSON.stringify(state.isActiveAnimation));
        },

        initializeAnimation: (state) => {
            const savedAnimation = localStorage.getItem("animation");
            state.isActiveAnimation = savedAnimation !== null ? JSON.parse(savedAnimation) : true;
        },
        
    },
});
  
export const { isBgAnimation, initializeAnimation } = bgAnimationSlice.actions;


export default bgAnimationSlice;