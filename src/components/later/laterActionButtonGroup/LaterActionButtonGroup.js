import React from "react";
import classes from "./laterActionButtonGroup.module.css";

export const LaterActionButtonGroup = ({ onRemove, isUpdating, onMove }) => {
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
        <button className={`${classes.box__btns__later} ${classes.btns__sep}`} onClick={onMove}>
         Move To Cart
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
