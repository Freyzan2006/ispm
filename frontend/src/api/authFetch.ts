
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import { TokenAPI, RefreshTokenAPI } from './api';
import axiosConfig from './axiosConfig';

export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axiosConfig.post(TokenAPI, credentials);
    console.log(response.data)
    return response.data;
});

export const refreshToken  = createAsyncThunk('auth/refreshToken', async (refreshToken) => {
    const response = await axiosConfig.post(RefreshTokenAPI, { refresh: refreshToken });
    console.log(response.data)
    return response.data;
});



