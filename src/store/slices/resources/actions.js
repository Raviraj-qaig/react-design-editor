import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import api from "~/services/api";
export const setPixabayResources = createAction("resources/setPixabayResources");
export const getPixabayResources = createAsyncThunk("resources/getPixabayResources", async (_, { rejectWithValue, dispatch }) => {
    try {
        const pixabayResources = await api.getPixabayResources();
        dispatch(setPixabayResources(pixabayResources));
    }
    catch (err) {
        return rejectWithValue(err.response?.data?.error.data || null);
    }
});
export const getPexelsResources = createAsyncThunk("resources/getPexelsResources", async (_, { rejectWithValue, dispatch }) => {
    try {
        const fonts = await api.getFonts();
        dispatch(setPixabayResources(fonts));
    }
    catch (err) {
        return rejectWithValue(err.response?.data?.error.data || null);
    }
});
