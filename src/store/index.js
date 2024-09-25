// store.js
import { configureStore } from "@reduxjs/toolkit";

import backdropReducer from "./backdropSlice";

import loaderReducer from "./loaderSlice";
import phoneNumberReducer from "./authentication/phoneNumberSlice";
import spinnerReducer from "./spinnerSlice"
import newPhoneFilterReducer from "./newPhoneFilter/newPhoneFilterSlice"

export const store = configureStore({
  reducer: {
    backdrop: backdropReducer,

    loader: loaderReducer,
    phoneNumber: phoneNumberReducer,
    spinner: spinnerReducer,
    newPhoneFilters: newPhoneFilterReducer

  },
});
