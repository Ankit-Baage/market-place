import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import classes from "./newPhoneColors.module.css";

export const NewPhoneColors = ({
  colors,
  color: initialColor,
  onColorSelect,
}) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [width, setWidth] = useState(0);

  const carousel = useRef();
  console.log(colors);
  const handleColorSelect = (color) => {
    setSelectedColor(color.color);
    onColorSelect(color);
  };

  useEffect(() => {
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
                } ${
                  color.is_active === 0 ? classes.inActive : ""
                }`}
                onClick={() => handleColorSelect(color)}
                disabled={color.is_active === 0}
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
