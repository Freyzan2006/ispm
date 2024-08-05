
import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./Iuser";
import { fetchUserData } from "../api/userFetch";
import { EStatus } from "../api/EAPI";


const initialState: UserState = {
    id: null,
    username: null,
    status: EStatus.IDLE,
    error: null,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = EStatus.LOADING;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = EStatus.IDLE;
                state.id = action.payload.id;
                state.username = action.payload.username;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = EStatus.FAILED;
                state.error = action.error.message || 'Failed to fetch user data';
            });
    },
});



export default userSlice.reducer;