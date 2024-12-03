import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  categoryFilter: "",
  filterOptions: {
    brand: null,
    spare: null,
    model: null,
    start: null,
    end: null,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setFilterOption: (state, action) => {
      const { key, value } = action.payload;
      if (key in state.filterOptions) {
        state.filterOptions[key] = value;
      } else if (key in state.filterOptions.price) {
        state.filterOptions.price[key] = value;
      }
    },
    resetFilterOptions: (state) => {
      state.filterOptions = {
        brand: null,
        spare: null,
        model: null,
        start: null,
        end: null,
      };
    },
  },
});

export const {
  setCategory,
  setCategoryFilter,
  setFilterOption,
  resetFilterOptions,
} = categorySlice.actions;

export const selectCategoryState = (state) => state.category;

export default categorySlice.reducer;
