import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
    isActive: true,
};
  

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        isLoading(state, action: PayloadAction<boolean>) {
            if ( action ) state.isActive = true;
 
            state.isActive = false;
        },
    },
});
  
export const { isLoading } = loadingSlice.actions;


export default loadingSlice;