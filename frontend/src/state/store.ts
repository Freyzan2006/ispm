import { configureStore } from '@reduxjs/toolkit';


import menuSlice from './menu/menuSlice';
import themeSlice from './theme/themeSlice';
import screenDimmingSlice from './screenDimming/screenDimmingSlice';
import loadingSlice from './loading/loadingSlice';
import tablesSlice from './tables/tablesSlice';
import authSlice from './auth/authSlice';
import userSlice from './user/userSlice';
import usersSlice from './users/usersSlice';
import publicTypeSlice from './publicType/publicTypeSlice';
import paginationSlice from './pagination/paginationSlice';
import searchSlice from './search/searchSlice';
import alertSlice from './alert/alertSlice';

import bgAnimationSlice from './bgAnimation/bgAnimationSlice';



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    menu: menuSlice.reducer,
    theme: themeSlice.reducer,
    screenDimming: screenDimmingSlice.reducer,
    loading: loadingSlice.reducer,
    tables: tablesSlice.reducer,
    auth: authSlice,
    user: userSlice,
    users: usersSlice,
    publicTypes: publicTypeSlice,
    pagination: paginationSlice.reducer,
    search: searchSlice.reducer,
    bgAnimation: bgAnimationSlice.reducer
  },
});

export default store;