import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { tablesFetch, tablesUserFetch } from "../../api/tablesFetch";

import { ITablesState, ITable } from "./Itables";
import { searchTablesFetch } from "../../api/seatchTablesFetch";

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
      .addCase(tablesFetch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(tablesFetch.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
        state.status = 'succeeded';
        state.tables = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(tablesFetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })


      .addCase(tablesUserFetch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(tablesUserFetch.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
        state.status = 'succeeded';
        state.tables = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(tablesUserFetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })


      .addCase(searchTablesFetch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchTablesFetch.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
        state.status = 'succeeded';
        state.tables = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(searchTablesFetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
     
  }
});
  
export const {  } = tablesSlice.actions;


export default tablesSlice;