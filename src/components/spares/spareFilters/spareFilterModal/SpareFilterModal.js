import React, { useState } from "react";
import { motion } from "framer-motion";
import classes from "./spareFilterModal.module.css";

export const SpareFilterModal = ({
  optionsData,
  onApply,
  filterData,
  onClose,
  onClear
}) => {
  const [filters, setFilters] = useState({ ...filterData, options: filterData.options || [] });


  const handleCheckboxChange = (event) => {
    const optionId = event.currentTarget.id;
    const isChecked = event.target.checked;
    setFilters((prevFilters) => ({
      ...prevFilters,
      options: isChecked
        ? [...prevFilters.options, optionId]
        : prevFilters.options.filter((id) => id !== optionId),
    }));
  };

  const clearHandler = () => {
    onClear()
    setFilters({ ...filterData, options:  [] })
  };
  const isApplyDisabled = filters.options.length === 0;

  const handleApply = () => {
    onApply(filters);
    
  };

  const filterClose = () => {
    onClose();
  };
  return (
    <div className={classes.backdrop} onClick={filterClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={classes.box}
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        exit={{ y: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
      >
        <div className={classes.box__content}>
          <div className={classes.box__content__head}>
            <h1 className={classes.box__content__head__title}>
              {(filters.type).charAt(0).toUpperCase() + (filters.type).slice(1)}
            </h1>
            <button
              className={classes.backdrop__btn}
              onClick={filterClose}
            ></button>
          </div>
          <hr className={classes.box__content__divider} />
          <div className={classes.box__content__filter}>
            {optionsData.map((item) => (
              <label
                htmlFor={item.id}
                key={item.id}
                className={classes.box__content__filter__option}
              >
                <input
                  id={item.id}
                  type="checkbox"
                  className={classes.box__content__filter__option__input}
                  value={item.id}
                  checked={filters.options.includes(item.id)}
                  onChange={handleCheckboxChange}
                />
                <span className={`${classes.box__content__filter__labelText} `}>
                  {item.label}
                </span>
                <span
                  className={classes.box__content__filter__option__label}
                ></span>
              </label>
            ))}
          </div>
        </div>
        <hr className={classes.box__content__divider} />
        <div className={classes.box__btn}>
          <button className={classes.box__btn__clear} onClick={clearHandler}>
            Clear All
          </button>
          <button className={classes.box__btn__apply} disabled={isApplyDisabled} onClick={handleApply}>
            Apply
          </button>
        </div>
      </motion.div>
    </div>
  );
};
