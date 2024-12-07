import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersThunk";
import { EStatus } from "../../../services/api/EAPI";

export interface IUserList {
  id: number;
  username: string;
}

export interface UsersState {
  users: IUserList[];
  status: EStatus;
  error: string | undefined
}

const initialState: UsersState = {
  users: [],
  status: EStatus.IDLE,
  error: undefined,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = EStatus.LOADING;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = EStatus.IDLE;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = EStatus.FAILED;
            state.error = action.error.message;
            console.error("Fetch users failed:", action.error.message); // Добавьте отладочную информацию
        });
    },
  });
  
export default usersSlice;