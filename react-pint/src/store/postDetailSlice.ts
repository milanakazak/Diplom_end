import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "./postSlice"; // Import the Post type

interface PostDetailState {
    selectedPost: Post | null;
}

const initialState: PostDetailState = {
    selectedPost: null,
};

const postDetailSlice = createSlice({
    name: "postDetail",
    initialState,
    reducers: {
        selectPost(state, action: PayloadAction<Post | null>) {
            state.selectedPost = action.payload;
        },
        clearPost(state) {
            state.selectedPost = null;
        },
    },
});

export const { selectPost, clearPost } = postDetailSlice.actions;

export default postDetailSlice.reducer;
