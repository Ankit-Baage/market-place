import React, { useState } from "react";
import { motion } from "framer-motion";

import classes from "./filter.module.css";

import { SortFilter } from "./SortFilter";
import { AspFilter } from "./AspFilter";
import { PFilter } from "./PFilter";
import { AppleFilter } from "./AppleFilter";

export const Filter = ({ filterType, filterData, onClose }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleItemIdChange = (itemId) => {
    setSelectedItemId(itemId);
  };

  const filterTypeData = filterData?.filter(
    (item) => item.component === filterType.toLowerCase()
  );

  let content;

  switch (filterType) {
    case "Sort":
      content = (
        <SortFilter
          sortData={filterTypeData}
          onItemIdChange={handleItemIdChange}
        />
      );
      break;
    case "Apple%":
      const initial = filterTypeData.find((item) => item.name === "start");
      const last = filterTypeData.find((item) => item.name === "end");

      const startAppleValue = initial ? initial.value : null;
      const endAppleValue = last ? last.value : null;
      const appleRange = {
        minValue: Number(startAppleValue),
        maxValue: Number(endAppleValue),
      };
      content = <AppleFilter appleData={appleRange} />;
      break;
    case "ASP":
      const startItem = filterTypeData.find((item) => item.name === "start");
      const endItem = filterTypeData.find((item) => item.name === "end");

      const startValue = startItem ? startItem.value : null;
      const endValue = endItem ? endItem.value : null;
      const sliderRange = {
        minValue: Number(startValue),
        maxValue: Number(endValue),
      };

      content = <AspFilter aspData={sliderRange} />;
      break;
    case "P4%":
      const startPercent = filterTypeData.find((item) => item.name === "start");
      const endPercent = filterTypeData.find((item) => item.name === "end");

      const percentRange = {
        minValue: startPercent ? Number(startPercent.value) : null,
        maxValue: endPercent ? Number(endPercent.value) : null,
      };
      content = <PFilter percentData={percentRange} />;
      break;
    default:
      content = null;
      break;
  }

  const filterClose = () => {
    onClose();
  };
  const clearHandler = () => {
    setSelectedItemId(null);
    // Implement any additional clearing logic here
  };

  return (
    <div className={classes.backdrop} onClick={filterClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={classes.box}
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        exit={{
          y: "100%",
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        <div className={classes.box__content}>
          <div className={classes.box__content__head}>
            <h1 className={classes.box__content__head__title}>{filterType}</h1>
            <button
              className={classes.backdrop__btn}
              onClick={filterClose}
            ></button>
          </div>
          <hr className={classes.box__content__divider} />

          {content}
        </div>
        <hr className={classes.box__content__divider} />
        <div className={classes.box__btn}>
          <button className={classes.box__btn__clear} onClick={clearHandler}>
            Clear All
          </button>
          <button className={classes.box__btn__apply}>Apply</button>
        </div>
      </motion.div>
    </div>
  );
};
