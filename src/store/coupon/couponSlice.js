import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  code: null,
  descrption: null,
  min_order_value: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    couponAdded: (state, action) => {
      state.id = action.payload.id;
      state.code = action.payload.code;
      state.descrption = action.payload.descrption;
      state.min_order_value = action.payload.min_order_value;
    },
    couponRemoved: (state) => {
      state.id = null;
      state.code = null;
      state.descrption = null;
      state.min_order_value = null;
    },
  },
});

export const { couponAdded, couponRemoved } = couponSlice.actions;
export const selectCouponState = (state) => state.coupon;
export default couponSlice.reducer;
