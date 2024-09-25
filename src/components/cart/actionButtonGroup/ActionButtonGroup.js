import React from "react";
import classes from "./actionButtonGroup.module.css";

export const ActionButtonGroup = ({onRemove}) => {
  return (
    <div className={classes.box}>
      <button className={classes.box__remove}onClick={onRemove}>Remove</button>
      <span className={classes.box__sep}/>
      <button className={classes.box__later}>Save for later</button>
      <span className={classes.box__sep}/>
      <button className={classes.box__buy}>Buy now</button>
    </div>
  );
};
