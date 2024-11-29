import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: null, // No error initially
  reducers: {
    setError: (state, action) => action.payload, // Set the error
    clearError: () => null, // Clear the error
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
