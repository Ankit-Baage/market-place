import React from "react";
import classes from "./wishListActionButtonGroup.module.css";

export const WishListActionButtonGroup = ({ onRemove, isUpdating, onMove }) => {
  return (
    <div className={classes.box}>
      <button
        className={classes.box__btns__cart}
        onClick={onMove}
      >
        Move To Cart
      </button>
      <button className={classes.box__btns__buy}>
        Buy now
      </button>
    </div>
  );
};
