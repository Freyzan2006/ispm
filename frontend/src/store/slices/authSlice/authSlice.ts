
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, refreshToken } from './authThunk';
import { EStatus } from '../../../services/api/EAPI';

import { AuthState } from "./Iauth"

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    status: EStatus.IDLE,
    error: null,
    refreshing: false,

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens(state, action: PayloadAction<{ access?: string | undefined; refresh?: string | undefined }>) {
            if (action.payload.access) state.accessToken = action.payload.access;
            if (action.payload.refresh) state.refreshToken = action.payload.refresh;
            if (action.payload.access) localStorage.setItem('accessToken', action.payload.access);
            if (action.payload.refresh) localStorage.setItem('refreshToken', action.payload.refresh);

            state.status = EStatus.SUCCEEDED;
            state.error = null;
        },
        clearTokens(state) {
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.status = EStatus.IDLE;
            state.error = null;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },

        setRefreshing(state, action: PayloadAction<boolean>) {
            state.refreshing = action.payload;
        },

        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload; // добавил этот метод
        },


    },

    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.status = EStatus.LOADING;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;
                localStorage.setItem('accessToken', action.payload.access);
                localStorage.setItem('refreshToken', action.payload.refresh);
                state.status = EStatus.SUCCEEDED;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = EStatus.FAILED;
                state.error = action.error.message || 'Failed to login';
            })
            .addCase(refreshToken.pending, (state) => {
                state.status = EStatus.LOADING;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh; // Обновляем refreshToken тоже
                localStorage.setItem('accessToken', action.payload.access);
                localStorage.setItem('refreshToken', action.payload.refresh);
                state.status = EStatus.SUCCEEDED;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.status = EStatus.FAILED;
                state.error = action.error.message || 'Failed to refresh token';
            });
    },
});

export const { setTokens, clearTokens, setError, setAccessToken } = authSlice.actions;
export default authSlice;