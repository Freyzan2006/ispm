import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { login, refreshToken } from '../../api/authFetch';
import { RootState } from '../store';


const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    status: 'idle',
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateTokens(state, action: PayloadAction<{ access: string; refresh: string }>) {
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            localStorage.setItem('accessToken', action.payload.access);
        },

        logout(state) {


            state.accessToken = null;
            state.refreshToken = null;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;
                localStorage.setItem('accessToken', action.payload.access);
                localStorage.setItem('refreshToken', action.payload.refresh);
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.access;
                localStorage.setItem('accessToken', action.payload.access);
            });
    },
});

export const { updateTokens, logout } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser = ((state: RootState) => state.auth.user);
// export const selectCurrentToken = ((state: RootState) => state.auth.token);