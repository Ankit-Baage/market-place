import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import classes from "./filterPage.module.css";

import useGetVrpSortingOptions from "../../../tanstack-query/vrp/useGetVrpSortingOptions";
import { SortFilterPage } from "./SortFilterPage";
import { AppleFilterPage } from "./AppleFilterPage";
import { P4filterPage } from "./P4filterPage";
import { AspFilterPage } from "./AspFilterPage";

export const FilterPage = ({
  onFilterSort,
  setFilterMode,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState(null);
  const [filterData, setFilterData] = useState([]);


  const { data, isSuccess } = useGetVrpSortingOptions();

  const transformData = useCallback((data) => {
    const transformedData = data?.reduce((acc, curr) => {
      const { id, component, value } = curr;
      const existingComponent = acc.find(
        (item) => item.component === component
      );

      if (existingComponent) {
        existingComponent.filterOptions.push({ id, value });
      } else {
        acc.push({ id, component, filterOptions: [{ id, value }] });
      }

      return acc;
    }, []);

    setFilterData(transformedData);
    console.log(transformedData);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      transformData(data.data.data);
    }
  }, [data, isSuccess, transformData]);


  const filterButtons = ["Sort", "Apple%", "P4%", "ASP"];

  const handleFilter = (filterType) => {
    setFilterMode(true);
    setSelectedFilterType(filterType);
    console.log(filterType);
    setOpen(true);
  };

  const handleApply = async () => {
    try {
      await onFilterSort();
    } catch (err) {
      console.error("Error applying filters:", err);
    }
  };

  const onClose = () => {
    setOpen(false);
    setFilterMode(false);
  };

  const filterComponents = {
    Sort: (
      <SortFilterPage
        sortData={
          filterData.find((item) => item.component === "sort")?.filterOptions
        }
        onClose={onClose}
        onApply={handleApply}
      />
    ),
    "Apple%": (
      <AppleFilterPage
        appleData={
          filterData.find((item) => item.component === "apple%")?.filterOptions
        }
        onClose={onClose}
        onApply={handleApply}
      />
    ),
    "P4%": (
      <P4filterPage
        percentData={
          filterData.find((item) => item.component === "p4%")?.filterOptions
        }
        onClose={onClose}
        onApply={handleApply}
      />
    ),
    ASP: (
      <AspFilterPage
        aspData={
          filterData.find((item) => item.component === "asp")?.filterOptions
        }
        onClose={onClose}
        onApply={handleApply}
      />
    ),
  };

  return (
    <div className={classes.box}>
      {filterButtons.map((button) => (
        <button
          className={classes.box__filter}
          key={button}
          onClick={() => handleFilter(button)}
        >
          {button} <span className={classes.box__filter__chevron} />
        </button>
      ))}
      <AnimatePresence>
        {open && selectedFilterType && filterComponents[selectedFilterType]}
      </AnimatePresence>
    </div>
  );
};
