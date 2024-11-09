



import { KeyWordJWT } from '../../../services/api/EAPI';
import axiosConfig from '../../../services/api/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';



export const getUserData = async (token: string) => {
    try {
        const response = await axiosConfig.get(`user/`);
       

        return response.data;
    } catch (error) {
        // console.error('Failed to fetch user data:', error);
        // throw error;
       
    }
};


export const userThunk = createAsyncThunk(
    'user/fetchUserData',
    async (token: string) => {
        const response = await getUserData(token);
        return response;
    }
);