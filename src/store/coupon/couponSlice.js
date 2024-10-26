import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupon_code: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    couponAdded: (state, action) => {
      state.coupon_code = action.payload.coupon_code;
    },
    couponRemoved: (state) => {
      state.coupon_code = null;
    },
  },
});

export const { couponAdded, couponRemoved } = couponSlice.actions;
export const selectCouponState = (state) => state.coupon;
export default couponSlice.reducer;
