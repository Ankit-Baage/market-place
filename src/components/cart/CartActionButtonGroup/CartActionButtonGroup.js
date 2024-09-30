import React from "react";
import classes from "./cartActionButtonGroup.module.css";

export const CartActionButtonGroup = ({ onRemove, isUpdating }) => {
  return (
    <div className={classes.box}>
      <hr className={classes.box__sep} />
      <div className={classes.box__btns}>
        <button
          className={`${classes.box__btns__remove} ${classes.btns__sep}`}
          onClick={onRemove}
          disabled={isUpdating}
        >
          Remove
        </button>
        <span className={classes.box__btns__sep} />
        <button className={`${classes.box__btns__later} ${classes.btns__sep}`}>
          Save for later
        </button>
        <span className={classes.box__btns__sep} />
        <button className={`${classes.box__btns__buy} ${classes.btns__sep}`}>
          Buy now
        </button>
      </div>
      <hr className={classes.box__sep} />
    </div>
  );
};
