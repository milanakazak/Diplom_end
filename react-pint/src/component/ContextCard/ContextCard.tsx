import { useEffect, useRef } from "react";
import Button from "../Button/Button";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../store/hooks";
import { hideContextMenu } from "../../store/contextMenuSlice";

interface ContextCardProps {
    onClose: () => void;
    onHidePin: (postId: string) => void;
}

const ContextCard: React.FC<ContextCardProps & { postId: string }> = ({
    onClose,
    onHidePin,
    postId,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                dispatch(hideContextMenu());
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch, onClose]);

    return (
        <div className={styles.contextCard}>
            <div className={styles.contextCardWrap}>
                <Button size="context" onClick={onClose}>
                    Добавить на доску
                </Button>
                <Button size="context" onClick={onClose}>
                    Пожаловаться на пин
                </Button>
                <Button
                    size="context"
                    onClick={() => {
                        onHidePin(postId);
                        onClose();
                    }}
                >
                    Скрыть пин
                </Button>
            </div>
        </div>
    );
};

export default ContextCard;
