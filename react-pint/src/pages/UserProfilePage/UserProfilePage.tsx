import { useEffect, useState } from "react";
import Button from "../../component/Button/Button";
import Card from "../../component/Card/Card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./styles.module.scss";
import { updateUserProfile } from "../../store/authSlice";
import UserPosts from "../../component/UserPosts/UserPosts";
import ThemeToggle from "../../component/ThemeToogle/ThemeToogle";

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState("created");
    const [editMode, setEditMode] = useState(false);
    const [editableUsername, setEditableUsername] = useState("");
    const [editableEmail, setEditableEmail] = useState("");

    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.auth.username) || "";
    const email = useAppSelector((state) => state.auth.email) || "";
    const savedCards = useAppSelector((state) => state.savedCards.savedCards);
    const createdPosts = useAppSelector((state) => state.posts.posts);

    useEffect(() => {
        setEditableUsername(username);
        setEditableEmail(email);
    }, [username, email]);

    if (!username) return <p>Данные о пользователе отсутствуют</p>;

    const names = username.split(" ");
    const initials = names.reduce((acc, item) => {
        acc += item[0]?.toUpperCase() ?? "";
        return acc;
    }, "");

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleSaveProfile = () => {
        const updatedProfile = {
            username: editableUsername,
            email: editableEmail,
        };

        dispatch(updateUserProfile(updatedProfile));

        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        setEditMode(false);
    };

    return (
        <div className={styles["user-profile"]}>
            <div className={styles["user-profile-wrap"]}>
                <div className={styles.theme}>
                    <ThemeToggle />
                </div>
                <div className={styles["user-profile-info"]}>
                    <div className={styles.userInfo}>
                        <div className={styles.userInfoAva}>{initials}</div>
                        {editMode ? (
                            <>
                                <input
                                    type="text"
                                    value={editableUsername}
                                    onChange={(e) =>
                                        setEditableUsername(e.target.value)
                                    }
                                />
                                <input
                                    type="email"
                                    value={editableEmail}
                                    onChange={(e) =>
                                        setEditableEmail(e.target.value)
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <span className={styles.userName}>
                                    {username}
                                </span>
                                <span>{email}</span>
                            </>
                        )}
                        <p>10 подписок</p>
                    </div>
                    <div className={styles.userbtn}>
                        <Button
                            size="context"
                            onClick={
                                editMode
                                    ? handleSaveProfile
                                    : () => setEditMode(true)
                            }
                        >
                            {editMode ? "Сохранить" : "Изменить профиль"}
                        </Button>
                    </div>
                </div>
                <div className={styles["user-profile-pins"]}>
                    <div className={styles.createPins}>
                        <button
                            onClick={() => handleTabChange("created")}
                            className={
                                activeTab === "created" ? styles.active : ""
                            }
                        >
                            Созданные
                        </button>
                    </div>
                    <div className={styles.savePins}>
                        <button
                            onClick={() => handleTabChange("saved")}
                            className={
                                activeTab === "saved" ? styles.active : ""
                            }
                        >
                            Сохраненные
                        </button>
                    </div>
                </div>

                {activeTab === "created" && (
                    <div className={styles.createdCardsList}>
                        {createdPosts.length === 0 ? (
                            <p>Вы еще не создали ни одного пина.</p>
                        ) : (
                            <UserPosts username={username} />
                        )}
                    </div>
                )}
                {activeTab === "saved" && (
                    <div className={styles.savedCardsList}>
                        {savedCards.length === 0 ? (
                            <p>Вы еще не сохранили ни одного пина.</p>
                        ) : (
                            savedCards.map((card) => (
                                <Card key={card.id} post={card} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
