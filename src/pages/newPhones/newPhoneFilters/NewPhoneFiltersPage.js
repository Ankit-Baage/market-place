import React from "react";
import { Filters } from "../../../components/filter/Filters";
import { useDispatch, useSelector } from "react-redux";
import { setFilterType } from "../../../store/newPhoneFilter/newPhoneFilterSlice";
import { FilterModal } from "../../../components/filter/FilterModal";
import useGetFilterNewPhoneOption from "../../../tanstack-query/newPhones/useGetFiltersNewPhoneOption";

const categories = [
  { id: "config", label: "Config" },
  { id: "brand", label: "Brand" },
  { id: "model", label: "Model" },
];

export const NewPhoneFiltersPage = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.newPhoneFilters.filterType);
  const { data, isSuccess, isLoading } = useGetFilterNewPhoneOption(category);

  const handleSelect = (category) => {
    console.log(category);
    dispatch(setFilterType(category));
  };
  console.log(category);
  return (
    <>
      <Filters categories={categories} onCategory={handleSelect} />
      {category && isSuccess && (
        <FilterModal options={data.data.data} category={category} />
      )}
    </>
  );
};
