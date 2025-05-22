import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import api from "~/services/api";
export const setFonts = createAction("fonts/setFonts");
export const getFonts = createAsyncThunk("fonts/getFonts", async (_, { rejectWithValue, dispatch }) => {
    try {
        const fonts = await api.getFonts();
        dispatch(setFonts(fonts));
    }
    catch (err) {
        return rejectWithValue(err.response?.data?.error.data || null);
    }
});
