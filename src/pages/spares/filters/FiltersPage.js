import React from "react";
import classes from "./filtersPage.module.css";

const filterButtons = ["Spare", "Brand", "Model", "Price"];

export const FiltersPage = () => {
  return (
    <div className={classes.box}>
      {filterButtons.map((button) => (
        <button className={classes.box__filter} key={button}>
          {button} <span className={classes.box__filter__chevron} />
        </button>
      ))}
      {/* <AnimatePresence>
      {open && selectedFilterType && filterComponents[selectedFilterType]}
    </AnimatePresence> */}
    </div>
  );
};
