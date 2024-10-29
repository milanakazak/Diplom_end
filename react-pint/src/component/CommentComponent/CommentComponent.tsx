import { FC } from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/hooks";
import { Comment, toggleCommentLike } from "../../store/commentSlice";

interface CommentProps {
    comment: Comment;
}

const CommentComponent: FC<CommentProps> = ({ comment }) => {
    const dispatch = useAppDispatch();
    const formattedTimestamp = new Date(comment.timestamp).toLocaleString();

    if (!comment || typeof comment.likes !== "number") {
        return <p>Ошибка: Комментарий не найден или данные некорректные</p>;
    }

    const {
        id,
        author,
        authorAvatarUrl,
        text,
        likes = 0,
        isLiked = false,
    } = comment;

    const handleLikeComment = () => {
        if (id) {
            dispatch(toggleCommentLike(id));
        }
    };

    return (
        <div className={styles.comment}>
            <div className={styles.commentUp}>
                <p>{formattedTimestamp}</p>

                <button
                    onClick={handleLikeComment}
                    className={styles.likeButton}
                >
                    {isLiked ? (
                        <FontAwesomeIcon
                            icon={faHeart}
                            style={{
                                fontSize: "16px",
                                color: "red",
                            }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faHeart}
                            style={{
                                fontSize: "16px",
                                color: "gray",
                            }}
                        />
                    )}
                    <p>{likes}</p>
                </button>

                <div className={styles.commentUser}>
                    <div className={styles.commentAvatar}>
                        {authorAvatarUrl && (
                            <img src={authorAvatarUrl} alt={author} />
                        )}
                    </div>
                    <p>{author}</p>
                </div>
            </div>
            <div className={styles.commentText}>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default CommentComponent;
