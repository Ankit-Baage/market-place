import React, { useCallback, useState } from "react";
import classes from "./sparePrice.module.css";

export const SparePrice = ({ prices }) => {
  const [qty, setQty] = useState(prices.quantity);

  // const handleQtyChange = (e) => {
  //   const newQty = e.target.value;
  //   setQty(newQty); // Update local state
  //   prices.onQuantityUpdate(newQty); // Pass the new value to the parent
  // };

  const handleQtyChange = useCallback(
    (e) => {
      const value = e.target.value;

      // Allow empty input temporarily and validate numeric input
      if (value === "" || /^[0-9]+$/.test(value)) {
        setQty(value); // Set the quantity to the current input value
        prices.onQuantityUpdate(value);
      }
    },
    [prices]
  );

  const handleQtyBlur = useCallback(() => {
    // Validate and reset to minimum value (1) if empty or invalid
    setQty((prev) => {
      // If the value is empty or not a valid number (<= 0), reset to 1
      const parsedValue = parseInt(prev, 10);
      return isNaN(parsedValue) || parsedValue <= 0 ? 1 : parsedValue;
    });
  }, []);

  console.log("quantity :", qty);
  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <h1 className={classes.box__title}>Our Price</h1>
        <div className={classes.box__price}>
          <div className={classes.box__container}>
            <h3 className={classes.box__price__discount}>
              Rs.{prices.discountedPrice}
            </h3>

            <h3 className={classes.box__price__original}>
              {prices.originalPrice}
            </h3>
            <span className={classes.box__price__discount__img}>
              {prices.discountPercentage}% OFF
            </span>
          </div>
          <div className={classes.box__info__qty}>
            <label htmlFor="qty" className={classes.box__info__qty__label}>
              Qty:
            </label>
            <input
              type="number"
              className={classes.box__info__qty__input}
              id="qty"
              value={qty}
              onChange={handleQtyChange}
              onClick={(e) => e.stopPropagation()} // Prevent triggering click on parent
              onBlur={handleQtyBlur}
            />
          </div>
        </div>
      </div>
      <hr className={classes.box__divider} />
    </div>
  );
};
