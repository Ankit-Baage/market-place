import React from "react";
import classes from "./categoryActionButtonGroup.module.css";

export const CategoryActionButtonGroup = ({onAdd}) => {
  return (
    <div className={classes.box__info__btns}>
      <button className={classes.box__info__btns__cart} onClick={onAdd}>Add to Cart</button>
      <button className={classes.box__info__btns__buy}>Buy Now</button>
    </div>
  );
};
