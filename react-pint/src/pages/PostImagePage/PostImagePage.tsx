import { FC, useEffect, useRef, useState } from "react";
import Card from "../../component/Card/Card";
import styles from "./styles.module.scss";
import { Post } from "../../store/postSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { hideContextMenu, hideDeskModal } from "../../store/contextMenuSlice";
import ContextCard from "../../component/ContextCard/ContextCard";
import ModalDesk from "../../component/ModalDesk/ModalDesk";

interface PostImagePageProps {
    posts: Post[];
}

const PostImagePage: FC<PostImagePageProps> = ({ posts }) => {
    const dispatch = useAppDispatch();
    const contextMenuRef = useRef<HTMLDivElement | null>(null);
    const {
        visible,
        position,
        postId: contextPostId,
        isDeskModalOpen,
    } = useAppSelector((state) => state.contextMenu);
    const [visiblePosts, setVisiblePosts] = useState(posts);

    const handleHidePin = (postId: string) => {
        setVisiblePosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
        );
        dispatch(hideContextMenu());
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            contextMenuRef.current &&
            !contextMenuRef.current.contains(event.target as Node)
        ) {
            dispatch(hideContextMenu());
        }
        if (isDeskModalOpen) {
            dispatch(hideDeskModal());
        }
    };

    useEffect(() => {
        if (visible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, dispatch]);

    if (!posts || posts.length === 0) {
        return <div>No posts available.</div>;
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles["main-wrap"]}>
                    {visiblePosts.map((post) => (
                        <Card key={post.id} post={post} />
                    ))}
                </div>
            </div>
            {visible && position && contextPostId && (
                <div
                    style={{
                        position: "absolute",
                        left: position.x,
                        top: position.y,
                        zIndex: 1000,
                    }}
                    ref={contextMenuRef}
                >
                    <ContextCard
                        onClose={() => dispatch(hideContextMenu())}
                        onHidePin={handleHidePin}
                        postId={contextPostId}
                    />
                </div>
            )}
            {isDeskModalOpen && position && (
                <div
                    style={{
                        position: "fixed",
                        left: position.x,
                        top: position.y,
                        zIndex: 1000,
                    }}
                >
                    <ModalDesk />
                </div>
            )}
        </div>
    );
};

export default PostImagePage;
