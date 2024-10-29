import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Comment {
    id: string;
    author: string;
    authorAvatarUrl?: string;
    text: string;
    timestamp: string;
    likes: number;
    isLiked?: boolean;
    onLike?: () => void;
    postId: string;
}

export const addComment = createAsyncThunk(
    "comments/addComment",
    async (newComment: Omit<Comment, "id">) => {
        const response = await fetch("http://localhost:3001/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComment),
        });
        return await response.json();
    }
);

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async () => {
        const response = await fetch("http://localhost:3001/comments");
        const data: Comment[] = await response.json();

        return data.map((comment) => ({
            ...comment,
            timestamp: new Date(comment.timestamp).toISOString(),
        }));
    }
);

interface CommentState {
    comments: Comment[];
}

const initialCommentState: CommentState = {
    comments: [],
};

const commentSlice = createSlice({
    name: "comments",
    initialState: initialCommentState,
    reducers: {
        toggleCommentLike: (state, action: PayloadAction<string>) => {
            const comment = state.comments.find((c) => c.id === action.payload);
            if (comment) {
                comment.isLiked = !comment.isLiked;
                comment.likes = comment.isLiked
                    ? comment.likes + 1
                    : comment.likes - 1;
                const likes = state.comments.map((c) => ({
                    id: c.id,
                    isLiked: c.isLiked,
                    likes: c.likes,
                }));
                localStorage.setItem("likes", JSON.stringify(likes));
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload.map((comment: Comment) => ({
                    ...comment,
                    timestamp: new Date(comment.timestamp).toISOString(),
                }));

                const storedLikes = localStorage.getItem("likes");
                if (storedLikes) {
                    const likesData = JSON.parse(storedLikes);
                    likesData.forEach(
                        (like: {
                            id: string;
                            isLiked: boolean;
                            likes: number;
                        }) => {
                            const comment = state.comments.find(
                                (c) => c.id === like.id
                            );
                            if (comment) {
                                comment.isLiked = like.isLiked;
                                comment.likes = like.likes;
                            }
                        }
                    );
                }
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const newComment: Comment = {
                    ...action.payload,
                    timestamp: new Date(action.payload.timestamp),
                };
                state.comments.push(newComment);
            });
    },
});

export const { toggleCommentLike } = commentSlice.actions;
export default commentSlice.reducer;
