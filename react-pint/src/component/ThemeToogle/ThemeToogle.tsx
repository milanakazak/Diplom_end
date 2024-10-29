import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toogleTheme } from "../../store/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
    const handleToggle = () => {
        dispatch(toogleTheme());
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
            }}
        >
            <Button onClick={handleToggle} size="small">
                {isDarkMode ? (
                    <FontAwesomeIcon
                        icon={faSun}
                        style={{
                            fontSize: "25px",
                            color: "gold",
                        }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faMoon}
                        style={{
                            fontSize: "28px",
                            color: "gold",
                        }}
                    />
                )}
            </Button>
        </div>
    );
};

export default ThemeToggle;
