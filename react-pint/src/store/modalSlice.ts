import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isLoginPopupOpen: boolean;
    isRegisterPopupOpen: boolean;
}

const initialState: ModalState = {
    isLoginPopupOpen: false,
    isRegisterPopupOpen: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openLoginPopup(state) {
            state.isLoginPopupOpen = true;
        },
        closeLoginPopup(state) {
            state.isLoginPopupOpen = false;
        },
        openRegisterPopup: (state) => {
            state.isRegisterPopupOpen = true;
        },
        closeRegisterPopup: (state) => {
            state.isRegisterPopupOpen = false;
        },
    },
});

export const {
    openLoginPopup,
    closeLoginPopup,
    openRegisterPopup,
    closeRegisterPopup,
} = modalSlice.actions;
export default modalSlice.reducer;
