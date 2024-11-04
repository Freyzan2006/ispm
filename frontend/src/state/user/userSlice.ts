
import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./Iuser";
import { userThunk } from "./userThunk";
import { EStatus } from "../api/EAPI";


const initialState: UserState = {
    id: null,
    username: null,
    is_staff: null,
    is_superuser: null,
    status: EStatus.IDLE,
    error: null,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser(state) {
            state.id = null
            state.username = null;
            state.is_staff = null;
            state.is_superuser = null;
            state.status = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userThunk.pending, (state) => {
                state.status = EStatus.LOADING;
            })
            .addCase(userThunk.fulfilled, (state, action) => {
                state.status = EStatus.IDLE;
                state.id = action.payload.id;
                state.username = action.payload.username;
                state.is_staff = action.payload.is_staff;
                state.is_superuser = action.payload.is_superuser;
            })
            .addCase(userThunk.rejected, (state, action) => {
                state.status = EStatus.FAILED;
                state.error = action.error.message || 'Failed to fetch user data';
            });
    },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;