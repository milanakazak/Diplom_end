import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import styles from "./styles.module.scss";
import Button from "../Button/Button";
import LoginForm from "../LoginForm/LoginForm";
import {
    closeLoginPopup,
    closeRegisterPopup,
    openLoginPopup,
    openRegisterPopup,
} from "../../store/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { useEffect, useRef } from "react";
import {
    FormState,
    LoginResponse,
    loginFunction,
    registerFunction,
} from "../../api";
import { authenticateUser, setRegistrationStatus } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const HeaderSign = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const registrationStatus = useAppSelector(
        (state) => state.auth.registrationStatus
    );
    const isLoginModalOpen = useAppSelector(
        (state) => state.modal.isLoginPopupOpen
    );
    const isRegisterModalOpen = useAppSelector(
        (state) => state.modal.isRegisterPopupOpen
    );
    const loginModalRef = useRef<HTMLDivElement>(null);
    const registerModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const { username, email } = JSON.parse(userData);
            dispatch(authenticateUser({ username, email }));
        }
    }, [dispatch]);

    const handleLoginSubmit = async (formData: FormState) => {
        const result = await loginFunction(formData);
        if (typeof result === "object" && result !== null) {
            const { username, email } = result as LoginResponse;
            dispatch(authenticateUser({ username, email }));
            dispatch(closeLoginPopup());
            localStorage.setItem("user", JSON.stringify({ username, email }));
        } else {
            alert("Ошибка входа. Пожалуйста, проверьте ваши данные.");
        }
    };

    const handleRegisterSubmit = async (formData: FormState) => {
        try {
            const success = await registerFunction(formData);
            if (success) {
                dispatch(
                    authenticateUser({
                        username: formData.username ?? "",
                        email: formData.email ?? "",
                    })
                );
                dispatch(setRegistrationStatus("success"));
            } else {
                alert("Ошибка регистрации. Пожалуйста, проверьте ваши данные.");
                dispatch(setRegistrationStatus("failed"));
            }
        } catch (error) {
            if (error instanceof Error) {
                alert("Ошибка регистрации: " + error.message);
                dispatch(setRegistrationStatus("failed"));
            }
        }
    };
    const handleLogin = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(openLoginPopup());
    };
    const handleRegister = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(openRegisterPopup());
    };

    const closeModalOnOutsideClick = (event: MouseEvent) => {
        if (
            isLoginModalOpen &&
            loginModalRef.current &&
            !loginModalRef.current.contains(event.target as Node)
        ) {
            dispatch(closeLoginPopup());
        }
        if (
            isRegisterModalOpen &&
            registerModalRef.current &&
            !registerModalRef.current.contains(event.target as Node)
        ) {
            dispatch(closeRegisterPopup());
        }
    };
    useEffect(() => {
        if (registrationStatus === "success") {
            navigate("/postimg");
            dispatch(setRegistrationStatus("idle"));
        }
    }, [registrationStatus, navigate, dispatch]);

    useEffect(() => {
        if (isLoginModalOpen || isRegisterModalOpen) {
            document.addEventListener("click", closeModalOnOutsideClick);
        } else {
            document.removeEventListener("click", closeModalOnOutsideClick);
        }
        return () => {
            document.removeEventListener("click", closeModalOnOutsideClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoginModalOpen, isRegisterModalOpen]);

    return (
        <header className={styles.header}>
            <div className={styles["header-wrap"]}>
                <div className={styles["set-pinter"]}>
                    <div className={styles.logo}>
                        <a href="#">
                            <FontAwesomeIcon
                                icon={faPinterest}
                                className={styles.faPinterest}
                            />
                            <p>Pinterest</p>
                        </a>
                    </div>
                </div>
                <div className={styles["sign"]}>
                    <Button size="small-s" onClick={handleLogin}>
                        Вход
                    </Button>
                    <Button size="small-s" onClick={handleRegister}>
                        Регистрация
                    </Button>
                </div>
            </div>
            {isLoginModalOpen && (
                <div className={styles.modal}>
                    <div ref={loginModalRef}>
                        <LoginForm onLogin={handleLoginSubmit} />
                    </div>
                </div>
            )}
            {isRegisterModalOpen && (
                <div className={styles.modal}>
                    <div ref={registerModalRef}>
                        <RegistrationForm
                            onRegister={handleRegisterSubmit}
                            onSuccess={() =>
                                console.log("Успешная регистрация")
                            }
                        />
                    </div>
                </div>
            )}
        </header>
    );
};

export default HeaderSign;
