import React from "react";
import classes from "./openBoxPrice.module.css";

export const OpenBoxPrice = ({ prices }) => {
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
          <div className={classes.box__quantity}>
            <button
              className={classes.box__quantity__decrement}
              onClick={() => prices.onQuantityUpdate("decrease")}
              disabled={prices.isUpdating}
            >
              -
            </button>
            <h2 className={classes.box__quantity__text}>{prices.openBoxQuantity}</h2>
            <button
              className={classes.box__quantity__increment}
              onClick={() => prices.onQuantityUpdate("increase")}
              disabled={prices.isUpdating}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className={classes.box__divider} />
    </div>
  );
};
