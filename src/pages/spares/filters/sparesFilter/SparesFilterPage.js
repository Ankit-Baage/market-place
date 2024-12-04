import React, { useEffect, useState } from "react";
import useGetFilterSpareOption from "../../../../tanstack-query/spares/useGetFilterSpareOption";
import classes from "./sparesFilter.module.css";
import { AnimatePresence } from "framer-motion";
import { SpareFilterModal } from "../../../../components/spares/spareFilters/spareFilterModal/SpareFilterModal";

import { useSearchParams } from "react-router-dom";

import { SparesPriceFilterPage } from "./SparesPriceFilterPage";
import { useSelector } from "react-redux";
import { selectFilterOptions } from "../../../../store/catergory/categorySlice";

const filterButtons = [
  { id: "spare", label: "Spares" },
  { id: "brand", label: "Brand" },
  { id: "model", label: "Model" },
  { id: "price", label: "Price" },
];

export const SparesFilterPage = ({
  onClear,
}) => {
  const selectedFilters = useSelector(selectFilterOptions)
  const [filters, setFilters] = useState({
    spare: [],
    brand: [],
    model: [],
    start: [],
    end: null,
    sort: null,
  });
  console.log("redux",selectedFilters)
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
    if (activeFilters.includes("start" ||"end" || "sort")) {
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
  console.log("currentFilter :",currentFilterType)

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
