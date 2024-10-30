import {
    faClockRotateLeft,
    faPlus,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../store/hooks";
import { hideDeskModal } from "../../store/contextMenuSlice";

const ModalDesk = () => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(hideDeskModal());
    };

    return (
        <div className={styles.modalDesk}>
            <div className={styles.modalDeskWrap}>
                <div className={styles.modalDeskWr}>
                    <button onClick={handleClose}>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className={styles.faXmark}
                        />
                    </button>
                    <h3>Сохранение</h3>
                </div>
                <ul className={styles.listDesk}>
                    <li className={styles.itemDesk}>
                        <div className={styles.iconDesk}>
                            <FontAwesomeIcon
                                icon={faClockRotateLeft}
                                className={styles.faClockRotateLeft}
                            />
                        </div>
                        <div className={styles.textDesk}>Профиль</div>
                    </li>
                </ul>
                <div className={styles.lineDesk}>
                    <div className={styles.iconDesk}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className={styles.faPlus}
                        />
                    </div>
                    <div className={styles.textDesk}>Создать доску</div>
                </div>
            </div>
        </div>
    );
};

export default ModalDesk;
