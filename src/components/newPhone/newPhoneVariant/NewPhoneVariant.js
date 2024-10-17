import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import classes from "./newPhoneVariant.module.css";

export const NewPhoneVariant = ({
  variants,
  variant,
  onVariantSelect,
  variantId,
}) => {
  const [itemId, setItemId] = useState(variantId);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    console.log(itemId);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [itemId]);

  const handleCheckboxChange = (itemId) => {
    console.log("phoneVariant:", itemId);

    setItemId(itemId);
    console.log(itemId);
    onVariantSelect(itemId);
  };
  return (
    <div className={classes.box}>
      <div className={classes.box__colors}>
        <h1 className={classes.box__colors__text}>Choose a variant</h1>
        <motion.div className={classes.box__colors__carousel} ref={carousel}>
          <motion.div
            className={classes.box__colors__carousel__inner}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            {variants?.map((item) => (
              <motion.label
                htmlFor={item.record_id}
                key={item.record_id}
                className={`${classes.box__content__filter__option} ${
                  item.is_active === 0 ? classes.inActive : ""
                }`}
              >
                <input
                  id={item.record_id}
                  type="radio"
                  className={classes.box__content__filter__option__input}
                  checked={itemId === item.record_id}
                  onChange={() => handleCheckboxChange(item.record_id)}
                  disabled={item.is_active === 0}
                />
                <span
                  className={`${classes.box__content__filter__labelText} ${
                    itemId === item.record_id
                      ? classes.box__content__filter__labelText__checked
                      : ""
                  } ${item.is_active === 0 ? classes.labelText__inActive : ""}`}
                >
                  {item.ram}/{item.rom}
                </span>
                <span
                  className={classes.box__content__filter__option__label}
                ></span>
              </motion.label>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <hr className={classes.box__item__divider} />
    </div>
  );
};
