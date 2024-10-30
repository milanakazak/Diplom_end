import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Input from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import { Post } from "../../store/postSlice";
import { uploadFile } from "../../api";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addPost } from "../../store/postSlice";

interface AddPostProps {
    onAddPost: (post: Post) => void;
}

const AddPost: React.FC<AddPostProps> = ({ onAddPost }) => {
    const [postTitle, setPostTitle] = useState<string>("");
    const [postDescription, setPostDescription] = useState<string>("");
    const [postBoard, setPostBoard] = useState<string>("");
    const [postTags, setPostTags] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.auth.username);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            setFile(event.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const newPost: Post = {
            id: uuidv4(),
            imageUrl: "",
            title: postTitle,
            description: postDescription,
            author: { username: username ?? "Аноним" },
            board: postBoard,
            tags: postTags,
            comments: [],
        };
        console.log("Создаваемый пост:", newPost);
        if (file) {
            try {
                const imageUrl = await uploadFile(file);
                newPost.imageUrl = imageUrl;
            } catch (error) {
                console.error("Ошибка при загрузке файла:", error);
                setIsLoading(false);
                alert("Ошибка при загрузке файла. Попробуйте еще раз.");
                return;
            }
        }

        try {
            dispatch(addPost(newPost));
            onAddPost(newPost);
            alert("Пост успешно добавлен!");
        } catch (error) {
            console.error("Ошибка при добавлении поста:", error);
            alert("Ошибка при добавлении поста. Попробуйте еще раз.");
        } finally {
            setIsLoading(false);
        }

        setPostTitle("");
        setPostDescription("");
        setPostBoard("");
        setPostTags([]);
        setFile(null);
    };

    useEffect(() => {
        const isFormValid =
            postTitle.trim() !== "" && postBoard.trim() !== "" && file !== null;
        setIsButtonDisabled(!isFormValid);
    }, [postTitle, postBoard, file]);

    return (
        <div className={styles["add-post"]}>
            <div className={styles["container"]}>
                <div className={styles["add-post-wrap"]}>
                    <div className={styles["title-add-post-wrap"]}>
                        <h2 className={styles["title-add-post"]}>
                            {" "}
                            Создание пина{" "}
                        </h2>
                        <Button
                            size="small-s"
                            onClick={handleSubmit}
                            disabled={isButtonDisabled || isLoading}
                        >
                            {isLoading ? "Загрузка..." : "Опубликовать"}
                        </Button>
                    </div>
                    <div className={styles["add-post-form"]}>
                        <div
                            className={styles["add-post-img"]}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <form className={styles["inp-file-btn"]}>
                                <span>
                                    <FontAwesomeIcon
                                        icon={faCloudArrowUp}
                                        className={styles["faCloudArrowUp"]}
                                    />
                                </span>
                                <span className={styles["inp-text"]}>
                                    {" "}
                                    Загрузите изображение:{" "}
                                </span>
                                <Input
                                    name="myFile"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                {file && <p>{file.name}</p>}
                            </form>
                        </div>
                        <div className={styles["add-post-text-forms"]}>
                            <form
                                className={styles["post"]}
                                onSubmit={handleSubmit}
                            >
                                <Input
                                    label="Название:"
                                    type="text"
                                    placeholder="Добавить название"
                                    name="name-you-post"
                                    value={postTitle}
                                    onChange={(e) =>
                                        setPostTitle(e.target.value)
                                    }
                                />
                                <Input
                                    label="Описание:"
                                    type="text"
                                    placeholder="Добавить подробное описание"
                                    name="description-you-card"
                                    value={postDescription}
                                    onChange={(e) =>
                                        setPostDescription(e.target.value)
                                    }
                                />
                                <Input
                                    label="Доска:"
                                    type="text"
                                    placeholder="Выберите доску"
                                    name="desk-you-card"
                                    value={postBoard}
                                    onChange={(e) =>
                                        setPostBoard(e.target.value)
                                    }
                                />
                                <Input
                                    label="Теги:"
                                    type="text"
                                    placeholder="Добавьте тег"
                                    name="tag-you-card"
                                    value={postTags.join(", ")}
                                    onChange={(e) =>
                                        setPostTags(
                                            e.target.value
                                                .split(",")
                                                .map((tag) => tag.trim())
                                        )
                                    }
                                />
                                <Button
                                    size="small-s"
                                    type="submit"
                                    disabled={isButtonDisabled || isLoading}
                                >
                                    {isLoading ? "Загрузка..." : "Опубликовать"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
