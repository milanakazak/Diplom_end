import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { Post } from "../../store/postSlice";

interface SearchProps {
    setResults: React.Dispatch<React.SetStateAction<Post[]>>;
    posts: Post[];
}

const Search: React.FC<SearchProps> = ({ setResults, posts }) => {
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        if (!posts || posts.length === 0) {
            console.log("No posts");
            return;
        }

        if (query.trim() === "") {
            setResults(posts);
            return;
        }

        const filteredResults = posts.filter((post) => {
            const lowerCaseQuery = query.toLowerCase();
            return (
                post.title.toLowerCase().includes(lowerCaseQuery) ||
                (Array.isArray(post.tags) &&
                    post.tags.some((tag) =>
                        tag.toLowerCase().includes(lowerCaseQuery)
                    )) ||
                (post.description &&
                    post.description.toLowerCase().includes(lowerCaseQuery))
            );
        });

        setResults(filteredResults);
    }, [query, posts, setResults]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <div className={styles["search-wrap"]}>
            <Button size="medium">
                <FontAwesomeIcon
                    className={styles.faMagnifyingGlass}
                    icon={faMagnifyingGlass}
                />
            </Button>
            <Input
                isSpecial
                type="text"
                placeholder="Поиск"
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default Search;
