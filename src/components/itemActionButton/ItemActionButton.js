import React from "react";
import classes from "./itemActionButton.module.css"

export const ItemActionButton = ({onAdd, onBuy}) => {
  return (
    <div className={classes.box__info__btns}>
      <button className={classes.box__info__btns__cart} onClick={onAdd}>Add to Cart</button>
      <button className={classes.box__info__btns__buy} onClick={onBuy}>Buy Now</button>
    </div>
  );
};
