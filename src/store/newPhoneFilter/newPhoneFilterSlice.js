import { createSlice } from "@reduxjs/toolkit";

const newPhoneFiltersSlice = createSlice({
  name: "newPhoneFilters",
  initialState: {
    filterType: null,
    activeFilters: [],
    selectedOptions: {
      brand: [],
      model: [],
      config: [],
    },
  },
  reducers: {
    // Add a filter type to the list of active filters
    addActiveFilter: (state, action) => {
      const filterType = action.payload;
      if (!state.activeFilters.includes(filterType)) {
        state.activeFilters.push(filterType);
      }
      console.log(state.activeFilters);
    },
    // Remove a filter type from the list of active filters
    removeActiveFilter: (state, action) => {
      const filterType = action.payload;
      state.activeFilters = state.activeFilters.filter((f) => f !== filterType);
    },
    // Add an option to a specific filter type
    addOption: (state, action) => {
      const { filterType, option } = action.payload;

      if (!state.selectedOptions[filterType].includes(option)) {
        state.selectedOptions[filterType].push(option);
      }
    },
    // Remove an option from a specific filter type
    removeOption: (state, action) => {
      const { filterType, option } = action.payload;
      state.selectedOptions[filterType] = state.selectedOptions[
        filterType
      ].filter((opt) => opt !== option);
    },
    // Set all selected options for a filter type (useful for clearing options when the filter is removed)
    setOptions: (state, action) => {
      const { filterType, options } = action.payload;
      if (state.activeFilters.includes(filterType)) {
        state.selectedOptions[filterType] = options;
      }
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
  },
});

export const {
  addActiveFilter,
  removeActiveFilter,
  addOption,
  removeOption,
  setOptions,
  setFilterType,
} = newPhoneFiltersSlice.actions;
export default newPhoneFiltersSlice.reducer;
