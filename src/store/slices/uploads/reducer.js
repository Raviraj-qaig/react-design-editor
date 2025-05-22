import { createReducer } from "@reduxjs/toolkit";
import { closeUploading, setUploading, setUploads } from "./actions";
const initialState = {
    uploads: [],
    uploading: null,
};
export const uploadsReducer = createReducer(initialState, (builder) => {
    builder.addCase(setUploads, (state, { payload }) => {
        state.uploads.unshift(...payload);
    });
    builder.addCase(setUploading, (state, { payload }) => {
        state.uploading = payload;
    });
    builder.addCase(closeUploading, (state) => {
        state.uploading = null;
    });
});
