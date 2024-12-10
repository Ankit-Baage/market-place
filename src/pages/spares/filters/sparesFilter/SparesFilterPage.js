import React, { useEffect, useState } from "react";
import useGetFilterSpareOption from "../../../../tanstack-query/spares/useGetFilterSpareOption";
import classes from "./sparesFilter.module.css";
import { AnimatePresence } from "framer-motion";
import { SpareFilterModal } from "../../../../components/spares/spareFilters/spareFilterModal/SpareFilterModal";

import { useSearchParams } from "react-router-dom";

import { SparesPriceFilterPage } from "./SparesPriceFilterPage";
import { useSelector } from "react-redux";
import { selectFilterOptions } from "../../../../store/category/categorySlice";

const filterButtons = [
  { id: "spare", label: "Spares" },
  { id: "brand", label: "Brand" },
  { id: "model", label: "Model" },
  { id: "price", label: "Price" },
];

export const SparesFilterPage = () => {
  const selectedFilters = useSelector(selectFilterOptions);
  const [filters, setFilters] = useState({
    spare: [],
    brand: [],
    model: [],
    start: [],
    end: null,
    sort: null,
  });
  console.log("redux", selectedFilters);
  const [currentFilterType, setCurrentFilterType] = useState(null);
  const [inFilterMode, setInFilterMode] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState([]);

  const { data, isSuccess, isLoading, refetch } =
    useGetFilterSpareOption(currentFilterType);

  useEffect(() => {
    const newFilters = {
      brand: searchParams.get("brand")?.split(",") || null,
      spare: searchParams.get("spare")?.split(",") || null,
      model: searchParams.get("model")?.split(",") || null,

      start: searchParams.get("start") || null,
      end: searchParams.get("end") || null,
      sort: searchParams.get("sort") || null,
    };

    setFilters(newFilters);
    const urlParams = Array.from(searchParams.entries());
    let activeFilters = urlParams.map(([key]) => key);
    if (activeFilters.includes("start" || "end" || "sort")) {
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
  console.log("currentFilter :", currentFilterType);

  const handlePriceChange = (start, end) => {
    if (filters.sort) {
      setSearchParams((params) => {
        params.set("sort", filters.sort);
        return params.toString();
      });
    }
    setSearchParams((params) => {
      params.set("start", start);
      params.set("end", end);
      return params.toString();
    });

    handleClose();
  };

  const handleRadio = (itemId) => {
    setFilters((prev) => ({
      ...prev,
      sort: itemId,
    }));
  };
  const handleApply = (appliedFilters) => {
    const { type, options } = appliedFilters;

    setSearchParams((params) => {
      params.set(type, options.join(","));
      return params;
    });

    handleClose();
  };

  const handleClose = () => {
    setInFilterMode(false);
  };

  const handleClear = (event, filterType) => {
    if (!inFilterMode) {
      event.stopPropagation();
    }

    // Check if the filterType is "price" and clear all related sub-filters
    let newFilters = { ...filters };
    if (filterType === "price") {
      newFilters = { ...newFilters, start: null, end: null, sort: null };
    } else {
      newFilters = { ...newFilters, [filterType]: null };
    }
    setFilters(newFilters);

    // Update URL search params to clear the corresponding filters
    setSearchParams((params) => {
      if (filterType === "price") {
        params.delete("start");
        params.delete("end");
        params.delete("sort");
      } else {
        params.delete(filterType);
      }
      return params;
    });

    handleClose();
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__btns}>
        {filterButtons.map((button) => (
          <button
            className={`${classes.box__filter} ${
              isActive(button.id) && classes.active
            }`}
            key={button.id}
            id={button.id}
            onClick={handleFilter}
          >
            {button.label}

            <span
              className={`${classes.box__filter__chevron} ${
                isActive(button.id) ? classes.box__filter__chevron__active : ""
              }`}
              onClick={(event) => {
                if (isActive(button.id)) {
                  event.stopPropagation(); // Prevents the parent filter button click event
                  handleClear(event, button.id); // Trigger clear functionality
                } else {
                  handleFilter(event); // Trigger filter mode if not active
                }
              }}
            ></span>
          </button>
        ))}
      </div>

      {/* {activeFilters.length > 0 && (
        <button className={classes.box__filter__clear} onClick={handleClearAll}>
          Clear Filters
        </button>
      )} */}
      <AnimatePresence>
        {isSuccess &&
          inFilterMode &&
          (currentFilterType === "price" ? (
            <SparesPriceFilterPage
              optionsData={data?.data.data}
              onApply={handlePriceChange}
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
