import { createSlice } from "@reduxjs/toolkit";

const confirmationModalSlice = createSlice({
  name: "confirmationModal",
  initialState: {
    isOpen: false,
    modalData: {
      id: null,
      mobile_no: null,
      address_line1: null,
      address_line2: null,
      city: null,
      state: null,
      postal_code:null,
      country: null,
    },
  },
  reducers: {
    onOpen: (state, action) => {
      state.isOpen = true;
      state.modalData = {
        id: action.payload.id || null,
        mobile_no: action.payload.mobile_no || null,
        address_line1: action.payload.address_line1 || null,
        address_line2: action.payload.address_line2 || null,
        city: action.payload.city || null,
        state: action.payload.state || null,
        postal_code: action.payload.postal_code || null,
        country: action.payload.country || null,
      };
    },
    onClose: (state) => {
      state.isOpen = false;
      state.modalData = {
        id: null,
        mobile_no: null,
        address_line1: null,
        address_line2: null,
        city: null,
        state: null,
        country: null,
        postal_code:null
      };
    },
  },
});

export const { onOpen, onClose } = confirmationModalSlice.actions;

export const selectConfirmationModalState = (state) => state.confirmationModal;

export default confirmationModalSlice.reducer;
