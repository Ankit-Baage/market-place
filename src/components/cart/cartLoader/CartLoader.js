import React from "react";
import classes from "./cartLoader.module.css";

export const CartLoader = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
    </div>
  );
};
