import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "./postSlice";

interface SavedCardsState {
    savedCards: Post[];
}

const initialState: SavedCardsState = {
    savedCards: JSON.parse(localStorage.getItem("savedCards") || "[]"),
};

const savedCardsSlice = createSlice({
    name: "savedCards",
    initialState,
    reducers: {
        addSavedCard: (state, action: PayloadAction<Post>) => {
            const exists = state.savedCards.find(
                (card) => card.id === action.payload.id
            );
            if (!exists) {
                state.savedCards.push(action.payload);
                localStorage.setItem(
                    "savedCards",
                    JSON.stringify(state.savedCards)
                );
            }
        },
        removeSavedCard: (state, action: PayloadAction<string>) => {
            state.savedCards = state.savedCards.filter(
                (card) => card.id !== action.payload
            );
            localStorage.setItem(
                "savedCards",
                JSON.stringify(state.savedCards)
            );
        },
    },
});

export const { addSavedCard, removeSavedCard } = savedCardsSlice.actions;
export default savedCardsSlice.reducer;
