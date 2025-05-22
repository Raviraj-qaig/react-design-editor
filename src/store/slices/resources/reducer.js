import { createReducer } from "@reduxjs/toolkit";
import { setPixabayResources } from "./actions";
const initialState = {
    pixabay: [],
};
export const resourcesReducer = createReducer(initialState, (builder) => {
    builder.addCase(setPixabayResources, (state, { payload }) => {
        state.pixabay = payload;
    });
});
