import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../../services/api/axiosConfig";




export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axiosConfig.get('user/allUsers/');
      
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Не забудьте пробросить ошибку
    }
});