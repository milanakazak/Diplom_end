import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommentComponent from "../../component/CommentComponent/CommentComponent";
import { toggleLike, fetchPosts } from "../../store/postSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faEllipsisVertical,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import Button from "../../component/Button/Button";
import { addComment, fetchComments } from "../../store/commentSlice";
import { addSavedCard, removeSavedCard } from "../../store/savedCardsSlice";

const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const [commentText, setCommentText] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const comments = useAppSelector((state) => state.comments.comments);
    const posts = useAppSelector((state) => state.posts.posts);
    const currentUser = useAppSelector((state) => state.auth.username);
    const savedCards = useAppSelector((state) => state.savedCards.savedCards);

    const post = posts.find((p) => p.id === id);
    const filteredComments = comments.filter(
        (comment) => comment.postId === id
    );

    useEffect(() => {
        const loadPosts = async () => {
            await dispatch(fetchPosts());
        };
        loadPosts();
    }, [dispatch]);

    useEffect(() => {
        const loadComments = async () => {
            await dispatch(fetchComments());
        };
        loadComments();
    }, [dispatch]);

    if (!post || typeof post.likes !== "number") {
        return <p>Ошибка: Пост не найден или не корректные данные</p>;
    }

    const handleSaveCard = (event: React.MouseEvent) => {
        event.stopPropagation();
        const isSaved = savedCards.some(
            (savedCard) => savedCard.id === post?.id
        );
        if (isSaved) {
            dispatch(removeSavedCard(post.id));
        } else {
            dispatch(addSavedCard(post));
            setSuccessMessage("Пост успешно сохранен!");
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const {
        title,
        description,
        imageUrl,
        author,
        authorAvatarUrl,
        likes = 0,
        isLiked,
        board,
    } = post;

    const handleLikePost = () => {
        if (id) {
            dispatch(toggleLike(id));
        }
    };

    const handleCommentSubmit = () => {
        if (commentText.trim() && id && currentUser) {
            const newComment = {
                postId: id,
                author: currentUser,
                text: commentText,
                timestamp: new Date().toISOString(),
                likes: 0,
            };
            dispatch(addComment(newComment));
            setCommentText("");
        }
    };

    const authorName = typeof author === "string" ? author : author.username;

    return (
        <div className={styles["main-card"]}>
            <div className={styles["main-card-img-wrap"]}>
                <div className={styles.content}>
                    <div className={styles["main-card-img"]}>
                        {imageUrl && (
                            <div className={styles["post-img"]}>
                                <img
                                    src={imageUrl}
                                    alt={title}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            "/path/to/fallback-image.jpg";
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles["main-card-text-content"]}>
                        <div className={styles["main-card-info"]}>
                            <div className={styles.infoLeft}>
                                <div className={styles["main-card-likes"]}>
                                    <button
                                        className={styles.likes}
                                        onClick={handleLikePost}
                                    >
                                        {isLiked ? (
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                style={{
                                                    fontSize: "20px",
                                                    color: "red",
                                                }}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                style={{
                                                    fontSize: "20px",
                                                    color: "gray",
                                                }}
                                            />
                                        )}{" "}
                                        <p>{likes}</p>
                                    </button>
                                </div>

                                <a className={styles["main-card-options"]}>
                                    <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                        className={
                                            styles["fa-ellipsis-vertical"]
                                        }
                                    />
                                </a>
                            </div>
                            <div className={styles.infoRight}>
                                <div className={styles["main-card-board"]}>
                                    <span>{board}</span>
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className={styles.faAngleDown}
                                    />
                                </div>
                                <div className={styles.savePost}>
                                    <Button
                                        size="medium-s"
                                        onClick={handleSaveCard}
                                    >
                                        {savedCards.some(
                                            (savedPost) =>
                                                savedPost.id === post.id
                                        )
                                            ? "Удалить"
                                            : "Сохранить"}
                                    </Button>
                                    {successMessage && (
                                        <div className={styles.successMessage}>
                                            {successMessage}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles["main-card-author"]}>
                            <div className={styles.author}>
                                <div className={styles["main-card-author-img"]}>
                                    <img
                                        src={authorAvatarUrl}
                                        alt={authorName}
                                    />
                                </div>
                                <div
                                    className={styles["main-card-author-name"]}
                                >
                                    <span>{authorName}</span>
                                </div>
                            </div>
                            <Button size="small-s">Подписаться</Button>
                        </div>
                        <h1>{title}</h1>
                        <div className={styles["main-card-descr"]}>
                            <p>{description}</p>
                        </div>
                        <div className={styles.comment}>
                            <h2>Комментарии</h2>
                            <div className={styles["scrollable-container"]}>
                                {filteredComments.map((comment) => (
                                    <CommentComponent
                                        key={comment.id}
                                        comment={comment}
                                    />
                                ))}
                            </div>
                            <div className={styles.commentForm}>
                                <input
                                    type="text"
                                    placeholder="Добавьте комментарий"
                                    value={commentText}
                                    onChange={(e) =>
                                        setCommentText(e.target.value)
                                    }
                                />
                                <button
                                    type="submit"
                                    onClick={handleCommentSubmit}
                                >
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailPage;
