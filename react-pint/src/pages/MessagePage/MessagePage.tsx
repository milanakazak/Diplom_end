import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import { faMessage, faUserFriends } from "@fortawesome/free-solid-svg-icons";

const MessagePage = () => {
    return (
        <div className={styles.message}>
            <div className={styles.messageWrap}>
                <h3> Входящие</h3>
                <div className={styles.messageContent}>
                    <div className={styles.messageContentWrap}>
                        <a className={styles.messageIcon}>
                            <FontAwesomeIcon
                                icon={faMessage}
                                className={styles.faMessage}
                            />
                        </a>
                        <p>Новое сообщение</p>
                    </div>
                    <div className={styles.messageContentWrap}>
                        <a className={styles.friends}>
                            <FontAwesomeIcon
                                icon={faUserFriends}
                                className={styles.faUserFriends}
                            />
                        </a>
                        <p>Пригласите друзей</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagePage;
