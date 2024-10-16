import React from "react";
import emptyCart from "../../assets/emptyCart.svg";
import classes from "./emptyCart.module.css";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <img
          src={emptyCart}
          alt="empty cart"
          className={classes.box__info__img}
        />
        <h3 className={classes.box__info__subtitle}>
        Nothing saved for later yet.
        </h3>
      </div>
      <Link to="/home" className={classes.box__link}>Back to product</Link>
    </div>
  );
};
