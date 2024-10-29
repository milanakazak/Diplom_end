import React from "react";

import { Post } from "../../store/postSlice";
import styles from "./styles.module.scss";
import { useAppSelector } from "../../store/hooks";

interface UserPostsProps {
    username: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ username }) => {
    const posts = useAppSelector((state) => state.posts.posts);
    const userPosts = posts.filter((post: Post) => {
        if (typeof post.author === "string") {
            return post.author === username;
        } else {
            return post.author.username === username;
        }
    });

    return (
        <div className={styles["user-posts"]}>
            {userPosts.length > 0 ? (
                userPosts.map((post: Post) => (
                    <div key={post.id} className={styles["post"]}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                    </div>
                ))
            ) : (
                <p>Пользователь еще не добавил посты.</p>
            )}
        </div>
    );
};

export default UserPosts;
