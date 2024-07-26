import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { tablesFetch } from "../../api/tablesFetch";

import { ITablesState, ITable } from "./Itables";

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
      .addCase(tablesFetch.fulfilled, (state, action: PayloadAction<ITable[]>) => {
        state.status = 'succeeded';
        state.tables = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(tablesFetch.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});
  
export const {  } = tablesSlice.actions;


export default tablesSlice;