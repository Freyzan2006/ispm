import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alertSlice/alertSlice.ts";
import loadingSlice from "./slices/loadingSlice/loadingSlice";
import menuSlice from "./slices/menuSlice/menuSlice";
import screenDimmingSlice from "./slices/screenDimmingSlice/screenDimmingSlice";
import themeSlice from "./slices/themeSilce/themeSlice";
import tablesSlice from "./slices/tablesSlice/tablesSlice";
import authSlice from "./slices/authSlice/authSlice";
import userSlice from "./slices/userSlice/userSlice";
import usersSlice from "./slices/usersSlice/usersSlice";
import publicTypeSlice from "./slices/publicTypeSlice/publicTypeSlice";
import paginationSlice from "./slices/paginationSlice/paginationSlice";
import searchSlice from "./slices/searchSlice/searchSlice";
import bgAnimationSlice from "./slices/bgAnimationSlice/bgAnimationSlice";

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    menu: menuSlice.reducer,
    theme: themeSlice.reducer,
    screenDimming: screenDimmingSlice.reducer,
    loading: loadingSlice.reducer,
    tables: tablesSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    users: usersSlice.reducer,
    publicTypes: publicTypeSlice,
    pagination: paginationSlice.reducer,
    search: searchSlice.reducer,
    bgAnimation: bgAnimationSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;