import React, { useEffect, useState } from "react";
import useGetFilterSpareOption from "../../../../tanstack-query/spares/useGetFilterSpareOption";
import classes from "./sparesFilter.module.css";
import { AnimatePresence } from "framer-motion";
import { SpareFilterModal } from "../../../../components/spares/spareFilters/spareFilterModal/SpareFilterModal";
import { parseQuery } from "../../../../utils/queryParamsUrl/pareseQuery";
import { useLocation, useSearchParams } from "react-router-dom";
import { SparePriceModal } from "../../../../components/spares/spareFilters/spareFilterModal/SparePriceModal";
import { SparesPriceFilterPage } from "./SparesPriceFilterPage";

const filterButtons = [
  { id: "spare", label: "Spare" },
  { id: "brand", label: "Brand" },
  { id: "model", label: "Model" },
  { id: "price", label: "Price" },
];

export const SparesFilterPage = ({ onApply, onPriceApply, onClear }) => {
  const [filters, setFilters] = useState({
    spare: [],
    brand: [],
    model: [],
    start: [],
    end: [],
  });
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
    };
    // console.log(filters.price.start);
    setFilters(newFilters);
    const urlParams = Array.from(searchParams.entries());
    let activeFilters = urlParams.map(([key]) => key);
    if(activeFilters.includes("start"&&"end")) {
      activeFilters = [...activeFilters, "price"]
    }
    setActiveFilters(activeFilters);
  }, [searchParams]);

  console.log(filters);
  console.log(activeFilters)
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
