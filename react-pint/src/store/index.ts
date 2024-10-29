import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import menuReducer from "./menuSlice";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import postDetailReducer from "./postDetailSlice";
import postsReducer from "./postSlice";
import contextMenuReducer from "./contextMenuSlice";
import commentsReducer from "./commentSlice";
import messageReducer from "./messageSlice";
import savedCardsReducer from "./savedCardsSlice";

export const store = configureStore({
    reducer: {
        savedCards: savedCardsReducer,
        message: messageReducer,
        comments: commentsReducer,
        contextMenu: contextMenuReducer,
        posts: postsReducer,
        postDetail: postDetailReducer,
        modal: modalReducer,
        auth: authReducer,
        menu: menuReducer,
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
