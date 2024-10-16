import React from "react";
import emptyWishList from "../../assets/empty__wishList.svg";
import classes from "./emptyCart.module.css";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <img
          src={emptyWishList}
          alt="empty cart"
          className={classes.box__info__img}
        />
        <h3 className={classes.box__info__subtitle}>
        Your wishlist is empty.
        </h3>
      </div>
      <Link to="/home" className={classes.box__link}>Back to product</Link>
    </div>
  );
};
