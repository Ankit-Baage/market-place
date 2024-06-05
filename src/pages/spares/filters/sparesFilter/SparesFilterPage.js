import React, { useEffect, useState } from "react";
import useGetFilterSpareOption from "../../../../tanstack-query/spares/useGetFilterSpareOption";
import classes from "./sparesFilter.module.css";
import { AnimatePresence } from "framer-motion";
import { SpareFilterModal } from "../../../../components/spares/spareFilters/spareFilterModal/SpareFilterModal";
import { parseQuery } from "../../../../utils/queryParamsUrl/pareseQuery";
import { useLocation, useSearchParams } from "react-router-dom";
import { SparePriceModal } from "../../../../components/spares/spareFilters/spareFilterModal/SparePriceModal";

const filterButtons = [
  { id: "spare", label: "Spare" },
  { id: "brand", label: "Brand" },
  { id: "model", label: "Model" },
  { id: "price", label: "Price" },
];

export const SparesFilterPage = ({ onApply }) => {
  const location = useLocation();
  const [filters, setFilters] = useState({
    spare: [],
    brand: [],
    model: [],
    price: [],
  });
  const [currentFilterType, setCurrentFilterType] = useState(null);
  const [inFilterMode, setInFilterMode] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    const newFilters = {
      brand: searchParams.get("brand")?.split(",") || null,
      spare: searchParams.get("spare")?.split(",") || null,
      model: searchParams.get("model")?.split(",") || null,
      price: searchParams.get("price")?.split(",") || null,
    };
    setFilters(newFilters);
    const urlParams = Array.from(searchParams.entries());
    const activeFilters = urlParams.map(([key]) => key);
    setActiveFilters(activeFilters);
  }, [searchParams]);
  

  console.log(filters)
  const isActive = (buttonId) => activeFilters.includes(buttonId);

  const handleFilter = (event) => {
    const mode = event.currentTarget.id;
    setCurrentFilterType(mode);
    setInFilterMode(true);
  };

  const handleApply = (appliedFilters) => {
    const { type, options } = appliedFilters;
    setSearchParams((params) => {
      params.set(type, options.join(","));
      return params;
    });
    
    // console.log(filters);
    onApply(appliedFilters);
    setInFilterMode(false);
  };

  const handleClose = () => {
    setInFilterMode(false);
  };

  const handleClear = () => {
    const newFilters = { ...filters, [currentFilterType]: null };
    setFilters(newFilters);
    setSearchParams((params) => {
      params.delete(currentFilterType);
      return params;
    });
    setInFilterMode(false);
  };

  const { data, isSuccess, isLoading, refetch } = useGetFilterSpareOption(
    currentFilterType
  );
  console.log(data)

  return (
    <div className={classes.box}>
      {filterButtons.map((button) => (
        <button
        className={`${classes.box__filter} ${isActive(button.id) && classes.active}`}
          key={button.id}
          id={button.id}
          onClick={handleFilter}
        >
          {button.label} <span className={classes.box__filter__chevron} />
        </button>
      ))}
      <AnimatePresence>
      {isSuccess && inFilterMode && (
          currentFilterType === "price" ? (
            <SparePriceModal
              // optionsData={data?.data.data}
              // onApply={handleApply}
              // filterType={filters.type}
              // filterData={{ type: currentFilterType, options: filters[currentFilterType] }}
              // onClose={handleClose}
              // onClear={handleClear}
            />
          ) : (
            <SpareFilterModal
              optionsData={data?.data.data}
              onApply={handleApply}
              filterType={filters.type}
              filterData={{ type: currentFilterType, options: filters[currentFilterType] }}
              onClose={handleClose}
              onClear={handleClear}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
};
