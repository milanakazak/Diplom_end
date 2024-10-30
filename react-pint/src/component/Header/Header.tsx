import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import styles from "./styles.module.scss";
import {
    faAngleDown,
    faCommentDots,
    faHome,
    faPlus,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import Search from "../Search/Search";
import ThemeToggle from "../ThemeToogle/ThemeToogle";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/index";
import { closeMenu, toogleMenu } from "../../store/menuSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { FC, useEffect, useRef } from "react";
import Menu from "../Menu/Menu";
import { Post } from "../../store/postSlice";
import { toogleMessage } from "../../store/messageSlice";
import Message from "../Message/Message";

interface HeaderProps {
    username: string;
    posts: Post[];
    setSearchResults: React.Dispatch<React.SetStateAction<Post[]>>;
    onLogout: () => void;
}

const Header: FC<HeaderProps> = ({
    username,
    posts,
    setSearchResults,
    onLogout,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isMenuOpen = useAppSelector((state: RootState) => state.menu.isOpen);
    const isMessageOpen = useAppSelector(
        (state: RootState) => state.message.isOpen
    );
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleMenuToggle = () => {
        dispatch(toogleMenu());
    };

    const handleMessageToggle = () => {
        dispatch(toogleMessage());
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            isMenuOpen
        ) {
            dispatch(toogleMenu());
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMenuOpen]);

    const handleCreateClickAddPost = () => {
        navigate("/addpost");
    };

    const handleCreateClickMain = () => {
        navigate("/postimg");
    };

    const handleProfile = () => {
        navigate("/profile");
    };

    const handleCreateClickMessage = () => {
        navigate("/message");
    };

    const isHomePage = location.pathname === "/postimg";
    const isAddPostPage = location.pathname === "/addpost";
    const isMessagePage = location.pathname === "/message";

    return (
        <header className={styles.header}>
            <div className={styles["header-wrap"]}>
                <div className={styles["set-pinter"]}>
                    <div className={styles.logo}>
                        <a href="../../index.html">
                            <FontAwesomeIcon
                                icon={faPinterest}
                                className={styles.faPinterest}
                            />
                        </a>
                    </div>
                    <Button
                        size="large"
                        onClick={handleCreateClickMain}
                        state={isHomePage ? "active" : "inactive"}
                    >
                        Главная
                    </Button>
                    <Button
                        size="large"
                        onClick={handleCreateClickAddPost}
                        state={isAddPostPage ? "active" : "inactive"}
                    >
                        Создать
                    </Button>
                </div>
                <Search setResults={setSearchResults} posts={posts} />
                <div className={styles["info-for-you"]}>
                    <div
                        className={styles.message}
                        onClick={handleMessageToggle}
                    >
                        <FontAwesomeIcon
                            icon={faCommentDots}
                            className={styles.faCommentDots}
                        />
                        {isMessageOpen && (
                            <div className={styles["message-modal-list"]}>
                                <Message />
                            </div>
                        )}
                    </div>
                    <div className={styles.profile} onClick={handleProfile}>
                        <FontAwesomeIcon
                            icon={faUser}
                            className={styles.faUser}
                        />
                    </div>
                    <div className={styles.theme}>
                        <ThemeToggle />
                    </div>
                    <div className={styles.menu}>
                        <Button onClick={handleMenuToggle}>
                            <FontAwesomeIcon
                                icon={faAngleDown}
                                className={styles.faAngleDown}
                            />
                        </Button>
                        {isMenuOpen && (
                            <div className={styles["menu-modal-list"]}>
                                <Menu
                                    onLogout={onLogout}
                                    username={username}
                                    closeMenu={() => dispatch(closeMenu())}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles["header-wrap-mobile"]}>
                <div className={styles["set-pinter"]}>
                    <Button
                        size="large"
                        onClick={handleCreateClickMain}
                        state={isHomePage ? "active" : "inactive"}
                    >
                        <FontAwesomeIcon
                            icon={faHome}
                            className={styles.faHome}
                        />
                    </Button>
                    <Search setResults={setSearchResults} posts={posts} />
                    <Button
                        size="large"
                        onClick={handleCreateClickAddPost}
                        state={isAddPostPage ? "active" : "inactive"}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className={styles.faPlus}
                        />
                    </Button>
                    <Button
                        size="large"
                        onClick={handleCreateClickMessage}
                        state={isMessagePage ? "active" : "inactive"}
                    >
                        <FontAwesomeIcon
                            icon={faCommentDots}
                            className={styles.faCommentDots}
                        />
                        {isMessageOpen && (
                            <div className={styles["message-modal-list"]}>
                                <Message />
                            </div>
                        )}
                    </Button>
                    <Button size="large" onClick={handleProfile}>
                        <FontAwesomeIcon
                            icon={faUser}
                            className={styles.faUser}
                        />
                    </Button>
                </div>{" "}
            </div>
        </header>
    );
};

export default Header;
