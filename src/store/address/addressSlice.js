import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  title: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressId: (state, action) => {
      state.id = action.payload.id;
    },
    setAddressTitle: (state, action) => {
      state.title = action.payload.title;
    },
  },
});

export const { setAddressId, setAddressTitle } = addressSlice.actions;
export const selectAddressState = (state) => state.address;
export default addressSlice.reducer;
