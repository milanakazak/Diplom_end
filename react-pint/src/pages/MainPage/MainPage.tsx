import { useEffect } from "react";
import RegistrationForm from "../../component/RegistrationForm/RegistrationForm";
import styles from "./styles.module.scss";
import { authenticateUser, setRegistrationStatus } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FormState, yourRegisterFunction } from "../../api";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registrationStatus = useAppSelector(
        (state) => state.auth.registrationStatus
    );

    const handleRegisterSubmit = async (formData: FormState) => {
        try {
            const success = await yourRegisterFunction(formData);
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

    useEffect(() => {
        if (registrationStatus === "success") {
            navigate("/postimg");
            dispatch(setRegistrationStatus("idle"));
        }
    }, [registrationStatus, navigate, dispatch]);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles["main-wrap"]}>
                    <div className={styles["cont-part-one"]}>
                        <div className={styles["content"]}>
                            <div className={styles["cont-text"]}>
                                <h2>Найдите идею</h2>
                                <p>
                                    Что еще вы хотите опробовать? Придумайте
                                    запрос на интересующую тему и просмотрите
                                    результаты.
                                </p>
                            </div>
                        </div>
                        <div className={styles["content"]}>
                            <div className={styles["content-img-wrap"]}>
                                <div className={styles["cont-img-wrap"]}>
                                    <div className={styles["cont-img1"]}>
                                        <img
                                            src="https://s.pinimg.com/webapp/topRight-6902088a.png"
                                            alt="Idea"
                                        />
                                    </div>
                                    <div className={styles["cont-img2"]}>
                                        <img
                                            src="https://s.pinimg.com/webapp/left-ccce7532.png"
                                            alt="Idea"
                                        />
                                    </div>
                                    <div className={styles["cont-img3"]}>
                                        <img
                                            src="https://s.pinimg.com/webapp/right-2bd1edfc.png"
                                            alt="Idea"
                                        />
                                    </div>
                                    <div className={styles["cont-img4"]}>
                                        <img
                                            src="https://s.pinimg.com/webapp/center-2d76a691.png"
                                            alt="Idea"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["cont-part-two"]}>
                        <div className={styles["content"]}>
                            <div className={styles["cont-text"]}>
                                <h2>Сохраняйте понравившиеся идеи</h2>
                                <p>
                                    Сохраняйте понравившиеся идеи, чтобы
                                    вернуться к ним в будущем.
                                </p>
                            </div>
                        </div>
                        <div className={styles["content"]}>
                            <div className={styles["content-img-wrap"]}>
                                <div className={styles["cont-img-wrap"]}>
                                    <div className={styles["cont-img1"]}>
                                        <img
                                            src="https://s.pinimg.com/webapp/future-home1-b8bc36e8.png"
                                            alt="Idea"
                                        />
                                    </div>
                                    <div className={styles["cont-img2"]}>
                                        <img
                                            src="https://s.pinimg.com/webapp/serve-my-drinks-4de83489.png"
                                            alt="Idea"
                                        />
                                    </div>
                                    <div className={styles["cont-img3"]}>
                                        <img
                                            src="https://s.pinimg.com/webapp/deck-of-dreams-205a139e.png"
                                            alt="Idea"
                                        />
                                    </div>
                                    <div className={styles["cont-img4"]}>
                                        <img
                                            src="https://s.pinimg.com/webapp/bathroom-upgrade-02599fd4.png"
                                            alt="Idea"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["cont-part-three"]}>
                        <div className={styles["content"]}>
                            <div className={styles["cont-text-wrap"]}>
                                <div className={styles["cont-text"]}>
                                    <h2>
                                        Посмотрите, сделайте, опробуйте и
                                        примерьте!
                                    </h2>
                                    <p>
                                        В Pinterest вы можете находить для себя
                                        новые увлечения и идеи со всего мира.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles["content"]}>
                            <div className={styles["content-img-wrap"]}>
                                <div className={styles["cont-img-wrap"]}>
                                    <div className={styles["cont-img1"]}>
                                        <img
                                            src="https://s.pinimg.com/webapp/shop-de8ddf10.png"
                                            alt="Idea"
                                        />
                                        <div className={styles["cont-img2"]}>
                                            <img
                                                src="https://s.pinimg.com/webapp/creator-pin-img-3bed5463.png"
                                                alt="Idea"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["cont-part-four"]}>
                        <div className={styles["content"]}>
                            <div className={styles["cont-text-wrap"]}>
                                <div className={styles["cont-text"]}>
                                    <h2>
                                        Зарегистрируйтесь, чтобы находить больше
                                        идей
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className={styles["content"]}>
                            <div className={styles["content-form-wrap"]}>
                                <RegistrationForm
                                    onRegister={handleRegisterSubmit}
                                    onSuccess={() =>
                                        console.log("Успешная регистрация")
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
