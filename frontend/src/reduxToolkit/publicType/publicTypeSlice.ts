import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../../api/usersFetch";
import { publicTypeFetch } from "../../api/publicTypeFetch";

interface IPublicType {
  id: number;
  title: string;
  // добавьте другие поля по необходимости
}

interface IPublicTypeState {
    publicTypes: IPublicType[];
    status2: 'idle' | 'loading' | 'failed';
    error2: string | null
}

const initialState: IPublicTypeState = {
    publicTypes: [],
    status2: 'idle',
    error2: null,
};

const publicTypeSlice = createSlice({
    name: 'publicType',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(publicTypeFetch.pending, (state) => {
            state.status2 = 'loading';
        })
        .addCase(publicTypeFetch.fulfilled, (state, action) => {
            state.status2 = 'idle';
            state.publicTypes = action.payload;
        })
        .addCase(publicTypeFetch.rejected, (state, action) => {
            state.status2 = 'failed';
            state.error2 = action.error.message;
            console.error("Fetch users failed:", action.error.message); // Добавьте отладочную информацию
        });
    },
  });
  
export default publicTypeSlice.reducer;