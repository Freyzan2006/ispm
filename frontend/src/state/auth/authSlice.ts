// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { login, refreshToken } from '../../api/authFetch';

// interface AuthState {
//     accessToken: string | null;
//     refreshToken: string | null;
//     status: 'idle' | 'loading' | 'succeeded' | 'failed';
//     error: string | null;
// }


// const initialState: AuthState = {
//     // accessToken: localStorage.getItem('accessToken') || null,
//     // refreshToken: localStorage.getItem('refreshToken') || null,
//     accessToken: null,
//     refreshToken: null,
//     status: 'idle',
//     error: null,
// };


// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         updateTokens(state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) {
            
//             state.accessToken = action.payload.accessToken;
//             state.refreshToken = action.payload.refreshToken;
//             // localStorage.setItem('accessToken', action.payload.accessToken);
//             // localStorage.setItem('refreshToken', action.payload.refreshToken);
//             state.status = "succeeded"
//         },

//         logout(state) {
//             state.accessToken = null;
//             state.refreshToken = null;
//             state.status = 'idle';
//             state.error = null;

//             // state.accessToken = null;
//             // state.refreshToken = null;
//             // localStorage.removeItem('accessToken');
//             // localStorage.removeItem('refreshToken');
//         },
//     },
//     extraReducers(builder) {
//         builder
//             .addCase(login.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.accessToken = action.payload.access;
//                 state.refreshToken = action.payload.refresh;
//                 localStorage.setItem('accessToken', action.payload.access);
//                 localStorage.setItem('refreshToken', action.payload.refresh);
//                 state.status = 'succeeded';
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message || 'Failed to login';
//             })
//             .addCase(refreshToken.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(refreshToken.fulfilled, (state, action) => {
//                 state.accessToken = action.payload.access;
//                 state.refreshToken = action.payload.refresh; // Обновляем refreshToken тоже
//                 localStorage.setItem('accessToken', action.payload.access);
//                 localStorage.setItem('refreshToken', action.payload.refresh);
//                 state.status = 'succeeded';
//             })
//             .addCase(refreshToken.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message || 'Failed to refresh token';
//             });
//     },
// });

// export const { updateTokens, logout } = authSlice.actions;

// export default authSlice.reducer;

// // export const selectCurrentUser = ((state: RootState) => state.auth.user);
// // export const selectCurrentToken = ((state: RootState) => state.auth.token);










import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, refreshToken } from './authThunk';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    status: 'idle',
    error: null,
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

            state.status = 'succeeded';
            state.error = null;
        },
        clearTokens(state) {
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.status = 'idle';
            state.error = null;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },

    extraReducers(builder) {
                builder
                    .addCase(login.pending, (state) => {
                        state.status = 'loading';
                    })
                    .addCase(login.fulfilled, (state, action) => {
                        state.accessToken = action.payload.access;
                        state.refreshToken = action.payload.refresh;
                        localStorage.setItem('accessToken', action.payload.access);
                        localStorage.setItem('refreshToken', action.payload.refresh);
                        state.status = 'succeeded';
                    })
                    .addCase(login.rejected, (state, action) => {
                        state.status = 'failed';
                        state.error = action.error.message || 'Failed to login';
                    })
                    .addCase(refreshToken.pending, (state) => {
                        state.status = 'loading';
                    })
                    .addCase(refreshToken.fulfilled, (state, action) => {
                        state.accessToken = action.payload.access;
                        state.refreshToken = action.payload.refresh; // Обновляем refreshToken тоже
                        localStorage.setItem('accessToken', action.payload.access);
                        localStorage.setItem('refreshToken', action.payload.refresh);
                        state.status = 'succeeded';
                    })
                    .addCase(refreshToken.rejected, (state, action) => {
                        state.status = 'failed';
                        state.error = action.error.message || 'Failed to refresh token';
                    });
            },
});

export const { setTokens, clearTokens, setError } = authSlice.actions;
export default authSlice.reducer;