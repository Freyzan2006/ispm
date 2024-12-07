




import axiosConfig from '../../../services/api/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';


// token: string
export const getUserData = async () => {
    try {
        const response = await axiosConfig.get(`user/`);
       

        return response.data;
    } catch (error) {

    }
};

// token: string
export const userThunk = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        // const response = await getUserData(token);
        const response = await getUserData();
        return response;
    }
);