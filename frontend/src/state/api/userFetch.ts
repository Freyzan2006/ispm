


import axios from 'axios';
import axiosConfig from './axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';



export const getUserData = async (token: string) => {
    try {
        const response = await axiosConfig.get(`user/`, {
            headers: {
                Authorization: `JWT ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
};


export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (token: string) => {
        const response = await getUserData(token);
        return response;
    }
);