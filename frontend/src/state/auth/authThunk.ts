
import { LoginResponse, Credentials } from "./IauthThunk";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearTokens, setError, setTokens } from "./authSlice";
import axiosConfig from "../api/axiosConfig";
import { AppDispatch, RootState } from "../store";
import { UserAPI } from "../api/EAPI";



export const login = createAsyncThunk<LoginResponse, Credentials, { dispatch: AppDispatch, state: RootState }>(
    'auth/login',
    async (credentials: Credentials, { dispatch }) => {
        try {
            const response = await axiosConfig.post(UserAPI.TOKEN_POST, credentials);
            dispatch(setTokens(response.data));
  
            return response.data;
        } catch (error) {
            dispatch(setError('Login failed'));
            throw error;
        }
    }
);

export const refreshToken = createAsyncThunk<LoginResponse, void, { dispatch: AppDispatch, state: RootState }>(
    'auth/refreshToken',
    async (_, { getState, dispatch }) => {
        const state = getState() as any;
        const { refreshToken } = state.auth;

        if (!refreshToken) {
            dispatch(clearTokens());
            throw new Error('No refresh token available');
        }

        if (state.auth.refreshing) {
            throw new Error('Token refresh in progress');
        }

        try {
            
            const response = await axiosConfig.post(UserAPI.REFRESH_TOKEN_POST, {
                refresh: refreshToken,
            });

            if (response.data.access) {
                dispatch(setTokens(response.data));
                return response.data;
            } else {
                throw new Error('Failed to refresh token: Invalid response');
            }

        } catch (error) {
            dispatch(clearTokens());
            dispatch(setError('Failed to refresh token'));
            throw error;
        }
    }
);
