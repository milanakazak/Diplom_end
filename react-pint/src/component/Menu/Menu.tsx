import { FC } from "react";
import UserInfo from "../UserInfo/UserInfo";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface MenuProps {
    username: string;
    onLogout: () => void;
    closeMenu: () => void;
}

const Menu: FC<MenuProps> = ({ username, onLogout, closeMenu }) => {
    const navigate = useNavigate();

    const handleAddPost = () => {
        closeMenu();
        navigate("/addpost");
    };
    const handlePostImg = () => {
        closeMenu();
        navigate("/postimg");
    };
    const handleProfile = () => {
        closeMenu();
        navigate("/profile");
    };
    return (
        <ul className={styles["menu-list"]}>
            <li className={styles["menu-list-item"]} onClick={handleProfile}>
                <button>
                    <UserInfo username={username} />
                </button>
            </li>
            <li className={styles["menu-list-item"]}>
                <button onClick={handlePostImg}>Главная</button>
            </li>{" "}
            <li className={styles["menu-list-item"]}>
                <button>Уведомления</button>
            </li>{" "}
            <li className={styles["menu-list-item"]}>
                <button onClick={handleAddPost}>Создать пост</button>
            </li>{" "}
            <li className={styles["menu-list-item"]}>
                <button onClick={onLogout}>Выход</button>
            </li>
        </ul>
    );
};

export default Menu;
