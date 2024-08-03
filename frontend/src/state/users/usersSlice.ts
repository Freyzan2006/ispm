import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../api/usersFetch";

interface User {
  id: number;
  username: string;
  // добавьте другие поля по необходимости
}

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'idle';
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            console.error("Fetch users failed:", action.error.message); // Добавьте отладочную информацию
        });
    },
  });
  
export default usersSlice.reducer;