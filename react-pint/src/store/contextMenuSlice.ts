import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContextMenuState {
    isDeskModalOpen: boolean;
    visible: boolean;
    position: { x: number; y: number } | null;
    postId?: string;
}

const initialState: ContextMenuState = {
    isDeskModalOpen: false,
    visible: false,
    position: null,
    postId: undefined,
};

const contextMenuSlice = createSlice({
    name: "contextMenu",
    initialState,
    reducers: {
        showContextMenu: (
            state,
            action: PayloadAction<{ x: number; y: number; postId: string }>
        ) => {
            state.visible = true;
            state.position = { x: action.payload.x, y: action.payload.y };
            state.postId = action.payload.postId;
            state.isDeskModalOpen = false;
        },
        hideContextMenu: (state) => {
            state.visible = false;
            state.postId = undefined;
        },
        showDeskModal: (
            state,
            action: PayloadAction<{ x: number; y: number; postId: string }>
        ) => {
            state.isDeskModalOpen = true;
            state.position = { x: action.payload.x, y: action.payload.y };
            state.postId = action.payload.postId;
            state.visible = false;
        },
        hideDeskModal: (state) => {
            state.isDeskModalOpen = false;
        },
    },
});

export const {
    showContextMenu,
    hideContextMenu,
    showDeskModal,
    hideDeskModal,
} = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
