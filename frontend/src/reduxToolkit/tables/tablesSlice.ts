import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { tablesFetch } from "../../api/tablesFetch";

import { ITablesState, ITable } from "./Itables";

const initialState: ITablesState  = {
  tables: [],
  status: null,
  error: null 
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
        state.status = 'resolved';
        state.tables = action.payload;
      })
      .addCase(tablesFetch.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
  
export const {  } = tablesSlice.actions;


export default tablesSlice;