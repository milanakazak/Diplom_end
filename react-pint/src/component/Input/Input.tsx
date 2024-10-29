import { ChangeEvent, forwardRef } from "react";
import styles from "./styles.module.scss";

interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password" | "email" | "file" | "date";
    disabled?: boolean;
    error?: string | null;
    name?: string;
    isSpecial?: boolean;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            isSpecial = false,
            label,
            placeholder,
            value = "",
            onChange,
            type = "text",
            disabled = false,
            error,
            name,
        },
        ref
    ) => {
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e);
        };

        return (
            <div className={isSpecial ? styles.special : styles.default}>
                {label && (
                    <label className={styles["input-label"]}>{label}</label>
                )}
                <input
                    ref={ref}
                    className={`${styles["input-field"]} ${
                        error ? styles["input-error"] : ""
                    }`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={handleChange}
                    disabled={disabled}
                />
                {error && (
                    <span className={styles["input-error-message"]}>
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

export default Input;
