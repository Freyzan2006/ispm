
import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./Iuser";
import { fetchUserData } from "../../api/userFetch";


const initialState: UserState = {
    id: null,
    username: null,
    status: 'idle',
    error: null,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'idle';
                state.id = action.payload.id;
                state.username = action.payload.username;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch user data';
            });
    },
});



export default userSlice.reducer;