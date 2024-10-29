import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
    isOpen: boolean;
}

const initialState: MenuState = {
    isOpen: false,
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        toogleMenu: (state) => {
            state.isOpen = !state.isOpen;
        },
        closeMenu: (state) => {
            state.isOpen = false;
        },
        openMenu: (state) => {
            state.isOpen = true;
        },
    },
});

export const { toogleMenu, closeMenu, openMenu } = menuSlice.actions;
export default menuSlice.reducer;
