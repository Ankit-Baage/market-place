import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import classes from "./filtersPage.module.css";
import { SpareFilterPage } from "./SpareFilterPage";

const filterButtons = ["Spare", "Brand", "Model", "Price"];

export const FiltersPage = (onFilter, setFilterMode
  ) => {
  const [open, setOpen] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const handleFilter = (filterType) => {
    // setFilterMode(true);
    setSelectedFilterType(filterType);
    console.log(filterType);
    setOpen(true);
  };


  const filterComponents = {
    "Spare": (
      <SpareFilterPage
      />
    ),
  };

  return (
    <div className={classes.box}>
      {filterButtons.map((button) => (
        <button className={classes.box__filter} key={button} onClick={() => handleFilter(button)}>
          {button} <span className={classes.box__filter__chevron} />
        </button>
      ))}
      <AnimatePresence>
      {open && selectedFilterType && filterComponents[selectedFilterType]}
    </AnimatePresence>
    </div>
  );
};
