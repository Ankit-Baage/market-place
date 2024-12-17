import React, { useState } from "react";
import classes from "./newPhonePrice.module.css";

export const NewPhonePrice = ({ prices }) => {
  const [qty, setQty] = useState(prices.quantity);

  const handleQtyChange = (e) => {
    const newQty = e.target.value;
    setQty(newQty); // Update local state
    prices.onQuantityUpdate(newQty); // Pass the new value to the parent
  };
  console.log(prices);
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
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>
      <hr className={classes.box__divider} />
    </div>
  );
};
