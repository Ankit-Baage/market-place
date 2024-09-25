import React from "react";
import classes from "./newPhonePrice.module.css";

export const NewPhonePrice = ({ prices }) => {
  console.log(prices)
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
              {prices.discountPercentage}% DISCOUNT
            </span>
          </div>
          <div className={classes.box__quantity}>
            <button className={classes.box__quantity__decrement}>-</button>
            <h2 className={classes.box__quantity__text}>3</h2>
            <button className={classes.box__quantity__increment}>+</button>
          </div>
        </div>
      </div>
      <hr className={classes.box__divider}/>
    </div>
  );
};
