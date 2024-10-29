import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    disabled?: boolean;
    children?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    state?: "loading" | "active" | "inactive";
    size?:
        | "small"
        | "medium"
        | "large"
        | "medium-s"
        | "small-s"
        | "context"
        | "medium-r";
    fullWidth?: boolean;
}

function Button({
    disabled = false,
    children,
    onClick,
    state = "inactive",
    type = "button",
    variant = "primary",
    size = "medium",
    fullWidth = false,
}: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${
                styles[state]
            }${fullWidth ? styles.fullWidth : ""}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
