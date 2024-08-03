import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isActive: false,
};
  

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleActive(state) {
            state.isActive = !state.isActive;
        },
    },
});
  
export const { toggleActive } = menuSlice.actions;


export default menuSlice;