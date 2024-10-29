import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "./commentSlice";

export interface Post {
    id: string;
    imageUrl: string;
    title: string;
    description?: string;
    author: string | { username: string };
    authorAvatarUrl?: string;
    likes?: number;
    isLiked?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onLike?: () => void;
    board?: string;
    tags?: string[];
    comments?: Comment[];
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await fetch("http://localhost:3001/images");
    return await response.json();
});

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [] as Post[],
    },
    reducers: {
        toggleLike: (state, action: PayloadAction<string>) => {
            const post = state.posts.find((p) => p.id === action.payload);
            if (post) {
                post.isLiked = !post.isLiked;
                post.likes = post.likes
                    ? post.likes + (post.isLiked ? 1 : -1)
                    : post.isLiked
                    ? 1
                    : 0;
                const likes = state.posts.map((c) => ({
                    id: c.id,
                    isLiked: c.isLiked,
                    likes: c.likes,
                }));
                localStorage.setItem("likes", JSON.stringify(likes));
            }
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            const storedLikes = localStorage.getItem("likes");
            if (storedLikes) {
                const likesData = JSON.parse(storedLikes);
                likesData.forEach(
                    (like: { id: string; isLiked: boolean; likes: number }) => {
                        const post = state.posts.find((c) => c.id === like.id);
                        if (post) {
                            post.isLiked = like.isLiked;
                            post.likes = like.likes;
                        }
                    }
                );
            }
        });
    },
});

export const { toggleLike, addPost } = postSlice.actions;
export default postSlice.reducer;
