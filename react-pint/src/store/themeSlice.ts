import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    isDarkMode: boolean;
}

const initialState: ThemeState = {
    isDarkMode: false,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toogleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
    },
});

export const { toogleTheme } = themeSlice.actions;

export default themeSlice.reducer;
