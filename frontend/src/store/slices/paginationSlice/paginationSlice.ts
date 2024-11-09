import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { MAX_PAGINATION_SIZE, PAGINATION_SIZE } from "../../../services/api/config";

interface IPaginationState {
    paginationCount: number;
    maxPaginationCount: number;
    minPaginationCount: number;
    currentPage: number;
}

const initialState: IPaginationState = {
    paginationCount: PAGINATION_SIZE,
    maxPaginationCount: MAX_PAGINATION_SIZE,
    minPaginationCount: 1,
    currentPage: 1,
};
  

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        SetCurrentPage(state, actions: PayloadAction<number>) {
            state.currentPage = actions.payload
        },

        ChangePagination(state, actions: PayloadAction<number>) {
            state.paginationCount = actions.payload;
        },

        SetMaxPaginationCount(state, action: PayloadAction<number>) {
            state.maxPaginationCount = action.payload;
        },
    },

    
});
  
export const { ChangePagination, SetMaxPaginationCount, SetCurrentPage } = paginationSlice.actions;



export default paginationSlice;