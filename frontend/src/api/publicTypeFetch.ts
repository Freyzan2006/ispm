import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "./axiosConfig";



export const publicTypeFetch = createAsyncThunk('table/publicTypeFetch', async () => {
    try {
        const response = await axiosConfig.get('table/publicType/');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching publicType:", error);
        throw error; // Не забудьте пробросить ошибку
    }
});