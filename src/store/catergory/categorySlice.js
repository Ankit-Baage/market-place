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
    sort:null,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
    },
    setFilterOption(state, action) {
      state.filterOptions.brand = action.payload.brand;
      state.filterOptions.model = action.payload.model;
      state.filterOptions.spare = action.payload.spare;
      state.filterOptions.start = action.payload.start;
      state.filterOptions.end = action.payload.end;
      state.filterOptions.sort = action.payload.sort;
    },
    resetFilterOptions(state) {
      state.filterOptions = { ...initialState.filterOptions };
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
export const selectFilterOptions = (state) => state.category.filterOptions;

export default categorySlice.reducer;
