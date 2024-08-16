import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { searchTablesThunk, tablesThunk, tablesUserThunk } from "./tablesThunk";

import { ITablesApiResponse, ITablesState } from "./Itables";
import { EStatus } from "../api/EAPI";


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
        state.status = EStatus.LOADING;
        state.error = null;
      })
      .addCase(tablesThunk.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
        state.status = EStatus.SUCCEEDED;
        state.tables = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(tablesThunk.rejected, (state, action) => {
        state.status = EStatus.FAILED;
        state.error = action.error.message || 'Unknown error';
      })


      .addCase(tablesUserThunk.pending, (state) => {
        state.status = EStatus.LOADING;
        state.error = null;
      })
      .addCase(tablesUserThunk.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
        state.status = EStatus.SUCCEEDED;
        state.tables = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(tablesUserThunk.rejected, (state, action) => {
        state.status = EStatus.FAILED;
        state.error = action.error.message || 'Unknown error';
      })


      .addCase(searchTablesThunk.pending, (state) => {
        state.status = EStatus.LOADING;
        state.error = null;
      })
      .addCase(searchTablesThunk.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
        state.status = EStatus.SUCCEEDED;
        state.tables = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(searchTablesThunk.rejected, (state, action) => {
        state.status = EStatus.FAILED;
        state.error = action.error.message || 'Unknown error';
      })



      // .addCase(downloadTable.pending, (state) => {
      //   state.status = EStatus.LOADING;
      //   state.error = null;
      // })
      // .addCase(downloadTable.fulfilled, (state, action) => {
      //   state.downloadUrl = action.payload.download_url;
      //   state.status = EStatus.SUCCEEDED;
      // })
      // .addCase(downloadTable.rejected, (state, action) => {
      //   state.status = EStatus.SUCCEEDED;
      //   state.error = action.error.message || 'Failed to download table';
      // })
      // .addCase(downloadFile.pending, (state) => {
      //   state.status = EStatus.LOADING;
      //   state.error = null;
      // })
      // .addCase(downloadFile.fulfilled, (state, action) => {
      //   const url = window.URL.createObjectURL(new Blob([action.payload.file]));
      //   window.location.href = url; // Автоматически скачиваем файл
      //   state.status = EStatus.SUCCEEDED;
      // })
      // .addCase(downloadFile.rejected, (state, action) => {
      //   state.status = EStatus.SUCCEEDED;
      //   state.error = action.error.message || 'Failed to download file';
      // });
     
  }
});
  
export const {  } = tablesSlice.actions;


export default tablesSlice;