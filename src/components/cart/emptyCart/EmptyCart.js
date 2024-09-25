import React from "react";
import emptyCart from "../../../assets/emptyCart.svg";
import classes from "./emptyCart.module.css";

export const EmptyCart = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <img src={emptyCart} alt="emptyCart" className={classes.box__info__img}/>
        <h3 className={classes.box__info__title}>Empty Cart</h3>
        <h4 className={classes.box__info__subTitle}>Looks like you haven’t made your choose yet</h4>
      </div>
      <button className={classes.box__info__navigate}>Back to product</button>
    </div>
  );
};
