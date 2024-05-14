import React, { useState, useEffect } from "react";
import classes from "./sortFilter.module.css";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export const SortFilter = ({
  sortData,
  onItemSelected,
  onClear,
  onClose,
  onApply,
  itemId
}) => {


  const handleCheckboxChange = (itemId) => {
    // setSelectedItemId(itemId);
    onItemSelected(itemId.toString());

  };

  const clearHandler = () => {
    onClear();
  };

  const handleApply = () => {
    onApply();
  };

  const filterClose = () => {
    console.log(itemId)
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
            <h1 className={classes.box__content__head__title}>Sort</h1>
            <button
              className={classes.backdrop__btn}
              onClick={filterClose}
            ></button>
          </div>
          <hr className={classes.box__content__divider} />
          <div className={classes.box__content__filter}>
            {sortData.map((item) => (
              <label
                htmlFor={item.id.toString()}
                key={item.id}
                className={classes.box__content__filter__option}
              >
                <input
                  id={item.id.toString()}
                  type="radio"
                  className={classes.box__content__filter__option__input}
                  checked={itemId === item.id.toString()}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <span
                  className={`${classes.box__content__filter__labelText} ${
                    itemId === item.id.toString()
                      ? classes.box__content__filter__labelText__checked
                      : ""
                  }`}
                >
                  {item.value}
                </span>{" "}
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
          <button className={classes.box__btn__apply} onClick={handleApply}>
            Apply
          </button>
        </div>
      </motion.div>
    </div>
  );
};
