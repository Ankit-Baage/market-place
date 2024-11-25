import React from "react";
import classes from "./productSkeleton.module.css";

export const ProductSkeleton = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
    </div>
  );
};
