import { FC } from "react";
import styles from "./styles.module.scss";

interface UserInfoProps {
    username: string | null;
}
const UserInfo: FC<UserInfoProps> = ({ username }) => {
    if (!username) return <p>No user data available</p>;
    const names = username.split(" ");
    const initials = names.reduce((acc, item) => {
        acc += item[0]?.toUpperCase() ?? "";
        return acc;
    }, "");

    return (
        <div className={styles.userInfo}>
            <div className={styles.userInfoAva}>{initials}</div>
            <span>{username}</span>
        </div>
    );
};

export default UserInfo;
