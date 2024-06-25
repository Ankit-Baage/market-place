import React, { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { motion } from "framer-motion";
import classes from "./sparePriceModal.module.css";
import { useSearchParams } from "react-router-dom";

export const SparePriceModal = ({
  radioButtons,
  onClose,
  onClear,

  minDataValue,
  maxDataValue,
  minValueFromUrl,
  maxValueFromUrl,
  onSelection,
  onItemSelected,
  item
}) => {
  
  const [minValue, setMinValue] = useState(minValueFromUrl);
  const [maxValue, setMaxValue] = useState(maxValueFromUrl);
  const [minValue2, setMinValue2] = useState(minValueFromUrl);
  const [maxValue2, setMaxValue2] = useState(maxValueFromUrl);

  const [selectedItemId, setSelectedItemId] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(selectedItemId)

  const handleChange = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };
  const filterClose = () => {
    onClose();
  };
  const clearHandler = () => {
    onClear();
  };

  const handleApply = () => {
    onSelection(minValue, maxValue);
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItemId(itemId);
    onItemSelected(itemId);
   
  };
  useEffect(() => {
    if (item !== undefined) {
      setSelectedItemId(item);
    }
  }, [item]);

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
            {radioButtons.map((item) => (
              <label
                htmlFor={item.id}
                key={item.id}
                className={classes.box__content__filter__option}
              >
                <input
                  id={item.id}
                  type="radio"
                  className={classes.box__content__filter__option__input}
                  checked={selectedItemId === item.id}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <span
                  className={`${classes.box__content__filter__labelText} ${
                    selectedItemId === item.id
                      ? classes.box__content__filter__labelText__checked
                      : ""
                  }`}
                >
                  {item.label}
                </span>{" "}
                <span
                  className={classes.box__content__filter__option__label}
                ></span>
              </label>
            ))}
          </div>

          <div className={classes.box__content__filter}>
            <MultiRangeSlider
              min={minDataValue}
              max={maxDataValue}
              minValue={minValueFromUrl}
              maxValue={maxValueFromUrl}
              canMinMaxValueSame={true}
              onInput={(e) => {
                handleInput(e);
              }}
              onChange={(e) => {
                setMinValue2(e.minValue);
                setMaxValue2(e.maxValue);
              }}
              label={false}
              ruler={false}
              style={{
                border: "none",
                boxShadow: "none",
                padding: "15px 10px",
              }}
              barLeftColor="#C6C6C6"
              barInnerColor="#FF6F3F"
              barRightColor="#C6C6C6"
              thumbLeftColor="#C6C6C6"
              thumbRightColor="#C6C6C6"
            />
            <div className={classes.box__content__filter__control}>
              <input
                type="number"
                value={minValue}
                id="minValue"
                name="minValue"
                className={classes.box__content__filter__control__input}
                // onInput={(e) => {
                //   setMinValue(e.target.value);
                // }}
                onChange={(e) => {
                  setMinValue(e.target.value);
                }}
              />
              <span className={classes.box__content__filter__control__to}>
                to
              </span>
              <input
                type="number"
                value={maxValue}
                id="maxValue"
                name="maxValue"
                className={classes.box__content__filter__control__input}
                // onInput={(e) => {
                //   setMaxValue(e.target.value);
                // }}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
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
