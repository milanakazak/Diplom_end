import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    email: string | null;
    registrationStatus: "idle" | "success" | "failed";
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    registrationStatus: "idle",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticateUser(
            state,
            action: PayloadAction<{ username: string; email: string }>
        ) {
            state.isAuthenticated = true;
            state.username = action.payload.username || "";
            state.email = action.payload.email || "";
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("username", state.username);
            localStorage.setItem("email", state.email);
        },
        logoutUser(state) {
            state.isAuthenticated = false;
            state.username = null;
            state.email = null;
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
        },
        setRegistrationStatus(
            state,
            action: PayloadAction<"idle" | "success" | "failed">
        ) {
            state.registrationStatus = action.payload;
        },
        updateUserProfile(
            state,
            action: PayloadAction<{ username: string; email: string }>
        ) {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
    },
});

export const {
    authenticateUser,
    logoutUser,
    setRegistrationStatus,
    updateUserProfile,
} = authSlice.actions;
export default authSlice.reducer;
