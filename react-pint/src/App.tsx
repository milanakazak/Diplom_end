import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import PostImagePage from "./pages/PostImagePage/PostImagePage";
import { Post } from "./store/postSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import AddPost from "./pages/AddPost/AddPost";
import Main from "./pages/MainPage/MainPage";
import HeaderSign from "./component/HeaderSign/HeaderSign";
import Header from "./component/Header/Header";
import { RootState } from "./store";
import { PostsProvider } from "./pages/PostContext/PostContext";
import PostDetailPage from "./pages/PostDetailPage/PostDetailPage";
import { authenticateUser, logoutUser } from "./store/authSlice";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

interface HeaderWithSignProps {
    isAuthenticated: boolean;
    username: string | null;
    posts: Post[];
    setSearchResults: React.Dispatch<React.SetStateAction<Post[]>>;
    onLogout: () => void;
}

function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<Post[]>([]);
    const [logoutAction, setLogoutAction] = useState(false);

    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
    const isAuthenticated = useAppSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const username = useAppSelector((state) => state.auth.username ?? null);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const { username, email } = JSON.parse(userData);
            dispatch(authenticateUser({ username, email }));
        }
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3001/images");
                if (!response.ok) {
                    throw new Error("HTTP error");
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load posts");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        setLogoutAction(true);
        dispatch(logoutUser());
        localStorage.removeItem("user");
        navigate("/");
    };

    useEffect(() => {
        if (!isAuthenticated && logoutAction) {
            navigate("/");
            setLogoutAction(false);
        } else if (
            isAuthenticated &&
            !logoutAction &&
            location.pathname === "/"
        ) {
            navigate("/postimg");
        }
    }, [isAuthenticated, navigate, location.pathname, logoutAction]);

    const addPost = (newPost: Post) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <PostsProvider>
            <div className={isDarkMode ? "dark-theme" : ""}>
                <HeaderWithSign
                    isAuthenticated={isAuthenticated}
                    username={username}
                    posts={posts}
                    setSearchResults={setSearchResults}
                    onLogout={handleLogout}
                />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route
                        path="/postimg"
                        element={
                            <PostImagePage
                                posts={
                                    searchResults.length > 0
                                        ? searchResults
                                        : posts
                                }
                            />
                        }
                    />
                    <Route
                        path="/addpost"
                        element={<AddPost onAddPost={addPost} />}
                    />
                    <Route path="/post/:id" element={<PostDetailPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                </Routes>
            </div>
        </PostsProvider>
    );
}

const HeaderWithSign = ({
    isAuthenticated,
    username,
    posts,
    setSearchResults,
    onLogout,
}: HeaderWithSignProps) => {
    const location = useLocation();
    const isMainPage = location.pathname === "/";

    if (isMainPage && !isAuthenticated) {
        return <HeaderSign />;
    }

    if (isAuthenticated && username) {
        return (
            <Header
                posts={posts}
                username={username}
                setSearchResults={setSearchResults}
                onLogout={onLogout}
            />
        );
    }

    return null;
};

export default App;
