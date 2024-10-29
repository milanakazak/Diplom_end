import { createSlice } from "@reduxjs/toolkit";

interface MessageState {
    isOpen: boolean;
}

const initialState: MessageState = {
    isOpen: false,
};

const menuSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        toogleMessage: (state) => {
            state.isOpen = !state.isOpen;
        },
        closeMessage: (state) => {
            state.isOpen = false;
        },
        openMessage: (state) => {
            state.isOpen = true;
        },
    },
});

export const { toogleMessage, closeMessage, openMessage } = menuSlice.actions;
export default menuSlice.reducer;
