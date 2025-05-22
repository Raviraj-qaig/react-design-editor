import { createReducer } from "@reduxjs/toolkit";
import { addPage, removePage } from "./actions";
import { nanoid } from "nanoid";
const initialState = {
    pages: [
        {
            id: nanoid(),
            name: "First page",
        },
    ],
};
export const designEditorReducer = createReducer(initialState, (builder) => {
    builder.addCase(addPage, (state, { payload }) => {
        state.pages = state.pages.concat(payload);
    });
    builder.addCase(removePage, () => { });
});
