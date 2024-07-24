import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isActive: false,
};
  

const screenDimmingSlice = createSlice({
    name: 'screenDimming',
    initialState,
    reducers: {
        isScreenDimming(state) {
            state.isActive = !state.isActive;
        },
    },
});
  
export const { isScreenDimming } = screenDimmingSlice.actions;


export default screenDimmingSlice;