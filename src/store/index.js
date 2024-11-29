// store.js
import { configureStore } from "@reduxjs/toolkit";

import backdropReducer from "./backdropSlice";

import loaderReducer from "./loaderSlice";
import phoneNumberReducer from "./authentication/phoneNumberSlice";
import spinnerReducer from "./spinnerSlice"
import newPhoneFilterReducer from "./newPhoneFilter/newPhoneFilterSlice";
import confirmationModalReducer from "./confirmationModal/confirmationModalSlice" ;
import couponReducer from "./coupon/couponSlice";
import addressReducer from "./address/addressSlice";
import errorReducer from "./error/errorSlice"

export const store = configureStore({
  reducer: {
    backdrop: backdropReducer,
    error: errorReducer,

    loader: loaderReducer,
    phoneNumber: phoneNumberReducer,
    spinner: spinnerReducer,
    newPhoneFilters: newPhoneFilterReducer,
    confirmationModal: confirmationModalReducer,
    coupon:couponReducer,
    address: addressReducer,

  },
});
