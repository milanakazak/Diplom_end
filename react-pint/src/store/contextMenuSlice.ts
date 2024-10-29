import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContextMenuState {
    visible: boolean;
    position: { x: number; y: number } | null;
    postId?: string;
}

const initialState: ContextMenuState = {
    visible: false,
    position: null as { x: number; y: number } | null,
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
        },
        hideContextMenu: (state) => {
            state.visible = false;
            state.postId = undefined;
        },
    },
});

export const { showContextMenu, hideContextMenu } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
