import { uniqueFilename } from "~/utils/unique";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import api from "~/services/api";
import axios from "axios";
import mime from "mime/lite";
export const setUploads = createAction("uploads/setUploads");
export const setUploading = createAction("uploads/setUploading");
export const closeUploading = createAction("uploads/closeUploading");
export const getUploads = createAsyncThunk("uploads/getUploads", async (_, { rejectWithValue, dispatch }) => {
    try {
        const uploads = await api.getUploads();
        dispatch(setUploads(uploads));
    }
    catch (err) {
        return rejectWithValue(err.response?.data?.error.data || null);
    }
});
export const uploadFile = createAsyncThunk("uploads/uploadFile", async (args, { dispatch }) => {
    const file = args.file;
    setUploading({
        progress: 0,
        status: "IN_PROGRESS",
    });
    const updatedFileName = uniqueFilename(file.name);
    const updatedFile = new File([file], updatedFileName);
    const response = await api.getSignedURLForUpload({ name: updatedFileName });
    await axios.put(response.url, updatedFile, {
        headers: { "Content-Type": mime.getType(updatedFileName) },
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploading({
                progress: percentCompleted,
                status: "IN_PROGRESS",
            });
        },
    });
    const uploadedFile = await api.updateUploadFile({ name: updatedFileName });
    dispatch(closeUploading());
    dispatch(setUploads([uploadedFile]));
});
