import React, { useState } from "react";
import classes from "./filters.module.css";

export const Filters = ({ categories, onCategory }) => {
  const [activeFilters, setActiveFilters] = useState([]);

  const isActive = (buttonId) => activeFilters.includes(buttonId);

  const handleFilter = (event) => {
    const mode = event.currentTarget.id;
    onCategory(mode);
  };
  return (
    <div className={classes.box}>
      {categories.map((category) => (
        <button
          className={`${classes.box__filter} ${
            isActive(category.id) && classes.active
          }`}
          key={category.id}
          id={category.id}
          onClick={handleFilter}
        >
          {category.label} <span className={classes.box__filter__chevron} />
        </button>
      ))}
    </div>
  );
};
