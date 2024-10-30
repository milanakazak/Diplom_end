import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../component/Button/Button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import Input from "../../component/Input/Input";
import { Post } from "../../store/postSlice";
import { useEffect, useState } from "react";
import Card from "../../component/Card/Card";

interface SearchProps {
    setResults: React.Dispatch<React.SetStateAction<Post[]>>;
    posts: Post[];
}

const SearchPage: React.FC<SearchProps> = ({ setResults, posts }) => {
    const [query, setQuery] = useState<string>("");
    const [filteredResults, setFilteredResults] = useState<Post[]>([]);

    useEffect(() => {
        if (!posts || posts.length === 0) {
            console.log("No posts");
            return;
        }

        if (query.trim() === "") {
            setResults(posts);
            return;
        }

        const results = posts.filter((post) => {
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

        setFilteredResults(results);
        setResults(results);
    }, [query, posts, setResults]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
    return (
        <div className={styles["search-wrap"]}>
            <div className={styles.searchWrapM}>
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
            <div className={styles["results-wrap"]}>
                {filteredResults.length > 0 ? (
                    filteredResults.map((card) => (
                        <Card key={card.id} post={card} />
                    ))
                ) : (
                    <p>Результатов не найдено</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
