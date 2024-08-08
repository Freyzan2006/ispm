import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../useAppDispatch";

interface IPaginationState {
    paginationCount: number;
    maxPaginationCount: number;
    minPaginationCount: number;
}

const initialState: IPaginationState = {
    paginationCount: 2,
    maxPaginationCount: 100,
    minPaginationCount: 1,
};
  

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        ChangePagination(state, actions) {
            state.paginationCount = actions.payload;
        },

        SetMaxPaginationCount(state, action: PayloadAction<number>) {
            state.maxPaginationCount = action.payload;
        },
    },

    
});
  
export const { ChangePagination, SetMaxPaginationCount } = paginationSlice.actions;



export default paginationSlice;