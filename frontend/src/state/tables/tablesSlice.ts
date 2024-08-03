import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { searchTablesThunk, tablesThunk, tablesUserThunk } from "./tablesThunk";

import { ITablesApiResponse, ITablesState } from "./Itables";


const initialState: ITablesState  = {
  tables: [],
  nextPage: null,
  previousPage: null,
  count: 0,
  status: null,
  error: null,
};
  

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {  },

  extraReducers: (builder) => {
    builder
      .addCase(tablesThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(tablesThunk.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
        state.status = 'succeeded';
        state.tables = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(tablesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })


      .addCase(tablesUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(tablesUserThunk.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
        state.status = 'succeeded';
        state.tables = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(tablesUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })


      .addCase(searchTablesThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchTablesThunk.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
        state.status = 'succeeded';
        state.tables = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(searchTablesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
     
  }
});
  
export const {  } = tablesSlice.actions;


export default tablesSlice;