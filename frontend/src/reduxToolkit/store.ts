import { configureStore } from '@reduxjs/toolkit';


import menuSlice from './menu/menuSlice';
import themeSlice from './theme/themeSlice';
import screenDimmingSlice from './screenDimming/screenDimmingSlice';
import loadingSlice from './loading/loadingSlice';
import tablesSlice from './tables/tablesSlice';


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    theme: themeSlice.reducer,
    screenDimming: screenDimmingSlice.reducer,
    loading: loadingSlice.reducer,
    tables: tablesSlice.reducer
  },
});

export default store;