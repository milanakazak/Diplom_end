import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeLoginPopup } from "../../store/modalSlice";
import { FormState } from "../../api";

interface LoginFormProps {
    onLogin: (formData: FormState) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [formState, setFormState] = useState<FormState>({
        username: "",
        email: "",
        password: "",
    });

    const usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formState.email || !formState.password) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        onLogin(formState);
        localStorage.setItem(
            "user",
            JSON.stringify({ email: formState.email })
        );
        setFormState({ username: "", email: "", password: "" });
        usernameRef.current?.focus();
    };

    const dispatch = useAppDispatch();
    const isLoginPopupOpen = useAppSelector(
        (state) => state.modal.isLoginPopupOpen
    );

    const handleClose = () => {
        console.log("Closing login popup");
        dispatch(closeLoginPopup());
    };

    if (!isLoginPopupOpen) {
        return null;
    }

    return (
        <div className={styles.popup}>
            <div className={styles.overlay} onClick={handleClose}></div>
            <div
                className={styles["content-form-wrap"]}
                onClick={(e) => e.stopPropagation()}
            >
                <h3>Добро пожаловать в Pinterest</h3>
                <p>Находите новые идеи для вдохновения</p>
                <div className={styles["cont-form-wrap"]}>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Адрес электронной почты"
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="Введите ваш Email"
                            ref={usernameRef}
                        />
                        <Input
                            label="Пароль"
                            type="password"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            placeholder="Введите ваш пароль"
                        />
                        <Button size="medium-s" type="submit">
                            Войти
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
