import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";
import classes from "./filterModal.module.css";
import { addOption, removeOption } from "../../store/newPhoneFilter/newPhoneFilterSlice";

export const FilterModal = ({ options, category }) => {
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.newPhoneFilters.selectedOptions[category]);
  console.log(selectedOptions)

  const handleCheckboxChange = (event) => {
    const optionId = event.currentTarget.id;
    const isChecked = event.target.checked;
    console.log(optionId)

    if (isChecked) {
      dispatch(addOption({ filterType: category, option: optionId }));
    } else {
      dispatch(removeOption({ filterType: category, option: optionId }));
    }
  };

  const clearHandler = () => {
    // Add clear logic if needed
  };

  const isApplyDisabled = options.length === 0;

  const handleApply = () => {
    // Add apply logic if needed
  };

  const filterClose = () => {
    // onClose logic if needed
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
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
            <button
              className={classes.backdrop__btn}
              onClick={filterClose}
            ></button>
          </div>
          <hr className={classes.box__content__divider} />
          <div className={classes.box__content__filter}>
            {options.map((item) => (
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
                  checked={selectedOptions.includes(item.id)}
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
          <button
            className={classes.box__btn__apply}
            disabled={isApplyDisabled}
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </motion.div>
    </div>
  );
};
