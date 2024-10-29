import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import {
    faAngleDown,
    faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { FC } from "react";
import { Post } from "../../store/postSlice";
import { selectPost } from "../../store/postDetailSlice";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { showContextMenu } from "../../store/contextMenuSlice";
import { addSavedCard } from "../../store/savedCardsSlice";

interface CardProps {
    post: Post;
}

const Card: FC<CardProps> = ({ post }) => {
    const { imageUrl, title, author, authorAvatarUrl } = post;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const authorName = typeof author === "string" ? author : author.username;

    const handleSaveCard = () => {
        dispatch(addSavedCard(post));
    };

    const initials = authorName
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase())
        .join("");

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(selectPost(post));
        navigate(`/post/${post.id}`);
    };

    const handleMenuToggle = (event: React.MouseEvent) => {
        event.stopPropagation();
        const { clientX, clientY } = event;
        const offsetX = 300;
        const offsetY = 150;

        dispatch(
            showContextMenu({
                x: clientX - offsetX,
                y: clientY - offsetY,
                postId: post.id,
            })
        );
    };

    return (
        <div className={styles["main-card"]} onClick={handleClick}>
            <div className={styles["main-card-img-wrap"]}>
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

                <div className={styles["main-card-inside-wrap"]}>
                    <div className={styles["main-card-inside-up"]}>
                        <div className={styles["main-card-inside-up-wrap"]}>
                            <div className={styles["save-desk"]}>
                                <span>DESK</span>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={styles.faAngleDown}
                                />
                            </div>
                            <Button size="large" onClick={handleSaveCard}>
                                Сохранить
                            </Button>
                        </div>
                    </div>
                    <div className={styles["main-card-inside-down"]}>
                        <div className={styles["main-wrap-down-right"]}>
                            <a
                                className={styles["main-card-options"]}
                                onClick={handleMenuToggle}
                            >
                                <FontAwesomeIcon
                                    icon={faEllipsisVertical}
                                    className={styles["fa-ellipsis-vertical"]}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["main-card-title"]}>{title}</div>
            <div className={styles["main-card-user"]}>
                {authorAvatarUrl ? (
                    <img
                        src={authorAvatarUrl}
                        alt={authorName}
                        className={styles["user-img"]}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                "/path/to/fallback-avatar.jpg";
                        }}
                    />
                ) : (
                    <div className={styles["user-initials"]}>{initials}</div>
                )}
                <p>{authorName}</p>
            </div>
        </div>
    );
};

export default Card;
