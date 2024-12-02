import { createSlice } from "@reduxjs/toolkit";

// Initial state structure
const initialState = {
  navigate_to_page: "",
  params: {
    brand: null,
    spare: null,
    config: null,
    model: null,
  },
};

const advertisementParamSlice = createSlice({
  name: "advertisementParams",
  initialState,
  reducers: {
    getAdvertisementParams: (state, action) => {
      // Destructure the payload to get navigate_to_page and params
      const { navigate_to_page, params } = action.payload;

      // Update navigate_to_page
      state.navigate_to_page = navigate_to_page || ""; // Default to an empty string if undefined

      // Parse `params` if it's a string, otherwise keep it as is
      if (params) {
        // Ensure params is a valid string
        if (typeof params === "string" && params.trim() !== "") {
          // Split the params string into key-value pairs
          const paramsObject = params.split("&").reduce((acc, pair) => {
            const [key, value] = pair.split("=");
            // Assign the key and value, defaulting to null if missing
            if (key && value) {
              acc[key] = value;
            }
            return acc;
          }, {});

          // Construct the final state.params object with defaults for missing keys
          state.params = {
            brand: paramsObject.brands || null,
            spare: paramsObject.spares || null,
            config: paramsObject.config || null,
            model: paramsObject.model || null,
          };
        } else {
          // If params string is empty or invalid, set default empty values
          state.params = {
            brand: null,
            spare: null,
            config: null,
            model: null,
          };
        }
      }
    },
  },
});

export const { getAdvertisementParams } = advertisementParamSlice.actions;
export const selectAdvertisementParams = (state) => state.advertisementParams;
export default advertisementParamSlice.reducer;
