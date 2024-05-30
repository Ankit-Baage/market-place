import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import classes from "./spareColors.module.css";

export const SpareColors = ({ colors, color: initialColor }) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [width, setWidth] = useState(0);

  const carousel = useRef();
  console.log(colors);

  useEffect(() => {
    console.log("scrollWidth:", carousel.current.scrollWidth);
    console.log("offsetWidth:", carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);
  return (
    <div className={classes.box}>
      <div className={classes.box__colors}>
        <h1 className={classes.box__colors__text}>Color</h1>
        <motion.div className={classes.box__colors__carousel} ref={carousel}>
          <motion.div
            className={classes.box__colors__carousel__inner}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            {colors.map((color) => (
              <motion.button
                key={color.record_id}
                className={`${classes.box__colors__btn} ${
                  selectedColor === color.color
                    ? classes.box__colors__btn__selected
                    : ""
                }`}
                onClick={() => setSelectedColor(color.color)}
              >
                {color.color}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <hr className={classes.box__item__divider} />
    </div>
  );
};
