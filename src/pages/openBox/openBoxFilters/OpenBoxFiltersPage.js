import React, { useEffect, useState } from "react";

import classes from "../../spares/filters/sparesFilter/sparesFilter.module.css";
import { AnimatePresence } from "framer-motion";


import { useSearchParams } from "react-router-dom";
import { SparesPriceFilterPage } from "../../spares/filters/sparesFilter/SparesPriceFilterPage";
import { SpareFilterModal } from "../../../components/spares/spareFilters/spareFilterModal/SpareFilterModal";
import useGetFilterOpenBoxOption from "../../../tanstack-query/openBox/useGetFiltersOpenBoxOption";



const filterButtons = [
  { id: "brand", label: "Brand" },
  { id: "model", label: "Model" },
  { id: "config", label: "Config" },

  { id: "price", label: "Price" },
];

export const OpenBoxFilterPage = ({
  onApply,
  onPriceApply,
  onClear,
  onSelection,
}) => {
  const [filters, setFilters] = useState({
    brand: [],
    model: [],
    start: [],
    end: [],
    config: [],
    sort: null,
  });
  const [currentFilterType, setCurrentFilterType] = useState(null);
  const [inFilterMode, setInFilterMode] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState([]);

  const { data, isSuccess, isLoading, refetch } =
  useGetFilterOpenBoxOption(currentFilterType);

  useEffect(() => {
    const newFilters = {
      brand: searchParams.get("brand")?.split(",") || null,
      config: searchParams.get("config")?.split(",") || null,
      model: searchParams.get("model")?.split(",") || null,

      start: searchParams.get("start") || null,
      end: searchParams.get("end") || null,
      sort: searchParams.get("sort") || null,
    };
    // console.log(filters.price.start);
    setFilters(newFilters);
    const urlParams = Array.from(searchParams.entries());
    let activeFilters = urlParams.map(([key]) => key);
    if (activeFilters.includes(("start" && "end") || "sort")) {
      activeFilters = [...activeFilters, "price"];
    }
    setActiveFilters(activeFilters);
  }, [searchParams]);

 
  const isActive = (buttonId) => activeFilters.includes(buttonId);

  const handleFilter = (event) => {
    const mode = event.currentTarget.id;
    setCurrentFilterType(mode);
    setInFilterMode(true);
  };

  const handlePriceChange = (start, end) => {
    onPriceApply(start, end);
    handleClose();
  };
  const handleApply = (appliedFilters) => {
    const { type, options } = appliedFilters;
    setSearchParams((params) => {
      params.set(type, options.join(","));
      return params;
    });

    onApply(appliedFilters);
    handleClose();
  };

  const handleRadio = (itemId) => {
    console.log(itemId);
    onSelection(itemId);
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

  return (
    <div className={classes.box}>
      {filterButtons.map((button) => (
        <button
          className={`${classes.box__filter} ${
            isActive(button.id) && classes.active
          }`}
          key={button.id}
          id={button.id}
          onClick={handleFilter}
        >
          {button.label} <span className={classes.box__filter__chevron} />
        </button>
      ))}
      <AnimatePresence>
        {isSuccess &&
          inFilterMode &&
          (currentFilterType === "price" ? (
            <SparesPriceFilterPage
              optionsData={data?.data.data}
              onApply={handlePriceChange}
              onClear={onClear}
              onClose={handleClose}
              onRadioApplied={(itemId) => handleRadio(itemId)}
            />
          ) : (
            <SpareFilterModal
              optionsData={data?.data.data}
              onApply={handleApply}
              filterType={filters.type}
              filterData={{
                type: currentFilterType,
                options: filters[currentFilterType],
              }}
              onClose={handleClose}
              onClear={handleClear}
            />
          ))}
      </AnimatePresence>
    </div>
  );
};