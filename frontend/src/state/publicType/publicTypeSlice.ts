import { createSlice } from "@reduxjs/toolkit";

import { publicTypeFetch } from "./publicTypeFetch";

import { IPublicTypeState } from "./IpublicType";

const initialState: IPublicTypeState = {
  publicTypes: [],
  status: 'idle',
  error: null,
};

const publicTypeSlice = createSlice({
    name: 'publicType',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(publicTypeFetch.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(publicTypeFetch.fulfilled, (state, action) => {
            state.status = 'idle';
            state.publicTypes = action.payload;
        })
        .addCase(publicTypeFetch.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'An unknown error occurred';
            console.error("Fetch users failed:", action.error.message); // Добавьте отладочную информацию
        });
    },
  });
  
export default publicTypeSlice.reducer;