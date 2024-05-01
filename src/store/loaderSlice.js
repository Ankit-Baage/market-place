// loaderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  error: null, // Optional error field
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    openLoader: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message || "";
      state.error = action.payload.error || null; // Set optional error
    },
    closeLoader: (state) => {
      state.isOpen = false;
      state.message = "";
      state.error = null; // Clear error on close
    },
  },
});

export const { openLoader, closeLoader } = loaderSlice.actions;
export const selectLoaderState = (state) => state.loader;
export default loaderSlice.reducer;
