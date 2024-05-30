import React, { useState } from "react";
import useGetFilterSpareOption from "../../../../tanstack-query/spares/useGetFilterSpareOption";
import classes from "./sparesFilter.module.css";
import { AnimatePresence } from "framer-motion";
import { SpareFilterModal } from "../../../../components/spares/spareFilters/spareFilterModal/SpareFilterModal";

const filterButtons = [
  { id: "spare", label: "Spare" },
  { id: "brand", label: "Brand" },
  { id: "model", label: "Model" },
  { id: "price", label: "Price" },
];

export const SparesFilterPage = ({ onApply }) => {
  const [filters, setFilters] = useState({
    type: null,
    options: [],
  });

  const handleFilter = (event) => {
    const mode = event.currentTarget.id;
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: mode,
    }));
  };

  // const handleSelectChange = (selectedOptions) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     options: selectedOptions,
  //   }));
  //   console.log(filters);
  // };
  const handleApply = (filters) => {
   
    console.log(filters);
    onApply(filters)
  };

  const { data, isSuccess, isLoading, refetch } = useGetFilterSpareOption(
    filters.type
  );

  return (
    <div className={classes.box}>
      {filterButtons.map((button) => (
        <button
          className={classes.box__filter}
          key={button.id}
          id={button.id}
          onClick={handleFilter}
        >
          {button.label} <span className={classes.box__filter__chevron} />
        </button>
      ))}
      <AnimatePresence>
        {isSuccess && filters.type && (
          <SpareFilterModal
            optionsData={data?.data.data}
            onApply={handleApply}
            filterType={filters.type}
            filterData={filters}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
