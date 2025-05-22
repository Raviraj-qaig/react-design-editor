import { createReducer } from "@reduxjs/toolkit";
import { setFonts } from "./actions";
const initialState = {
    fonts: [],
};
export const fontsReducer = createReducer(initialState, (builder) => {
    builder.addCase(setFonts, (state, { payload }) => {
        state.fonts = payload;
    });
});
