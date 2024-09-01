


import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isActiveAnimation: true,
};


  

const bgAnimationSlice = createSlice({
    name: 'bgAnimation',
    initialState,
    reducers: {
        isBgAnimation(state) {
            state.isActiveAnimation = !state.isActiveAnimation;
        },

      
        
    },
});
  
export const { isBgAnimation } = bgAnimationSlice.actions;


export default bgAnimationSlice;