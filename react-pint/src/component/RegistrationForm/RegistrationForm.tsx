import { useRef, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./styles.module.scss";
import { FormState } from "../../api";

interface RegistrationFormProps {
    onRegister: (formData: FormState) => void;
    onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    onRegister,
    onSuccess,
}) => {
    const [formState, setFormState] = useState<FormState>({
        username: "",
        email: "",
        password: "",
        date: "",
    });
    const [error, setError] = useState<string | null>(null);
    const usernameRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (error && name === "password") {
            setError(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await onRegister(formState);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    username: formState.username,
                    email: formState.email,
                })
            );
            onSuccess();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }

        setFormState({
            username: "",
            email: "",
            password: "",
            date: "",
        });
    };

    return (
        <div className={styles["content-form-wrap"]}>
            <h3> Добро пожаловать в Pinterest</h3>
            <p> Находите новые идеи для вдохновения</p>
            <div className={styles["cont-form-wrap"]}>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Input
                        label="Имя"
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        ref={usernameRef}
                    />
                    <Input
                        label="Адрес электронной почты"
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Enter your Email"
                    />
                    <Input
                        label="Пароль"
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    <Input
                        name="date"
                        label="Дата рождения"
                        type="date"
                        placeholder="дд.мм.гггг"
                        value={formState.date}
                        onChange={handleChange}
                        error={error}
                    />
                    <Button size="medium-s" type="submit">
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
