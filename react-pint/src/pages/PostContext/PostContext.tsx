import React, { createContext, useContext, useState, useEffect } from "react";
import { Post } from "../../store/postSlice";

interface PostsContextType {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    addPost: (post: Post) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (newPost: Post) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:3001/images");
                if (!response.ok) {
                    throw new Error("HTTP error");
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <PostsContext.Provider value={{ posts, setPosts, addPost }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error("usePosts must be used within a PostsProvider");
    }
    return context;
};
