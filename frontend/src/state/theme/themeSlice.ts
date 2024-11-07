import { createSlice } from "@reduxjs/toolkit";


import { ETheme } from "./ETheme";



const initialState = {
    theme: ETheme.DARK,
};



const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            const theme = state.theme === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK;
            state.theme = theme;
            localStorage.setItem("theme", theme); // Сохраняем тему в localStorage
        },
        initializeTheme: (state) => {
            const savedTheme = localStorage.getItem("theme") as ETheme | null;
            state.theme = savedTheme || ETheme.DARK;
        },
    },
});

export const { changeTheme, initializeTheme } = themeSlice.actions;



export default themeSlice;