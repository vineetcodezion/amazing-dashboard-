// src/store/imageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for uploading images
export const getImages = createAsyncThunk(
  "images/getImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/images/upload"
      );
      return response.data; // return the response data if successful
    } catch (error) {
      return rejectWithValue(error.response.data); // return error message
    }
  }
);

const imageSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    loading: false,
    error: null,
    progress: 0,
  },
  reducers: {
    resetImageState: (state) => {
      state.loading = false;
      state.error = null;
      state.progress = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.progress = 0; // Reset progress when uploading starts
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload; // Assuming the response contains an images array
      })
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      });
  },
});

// Export the action to reset the state
export const { resetImageState } = imageSlice.actions;

// Selector to get the images state
export const selectImages = (state) => state.images;

export default imageSlice.reducer;
