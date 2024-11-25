import React from 'react';
import classes from "./bestSellingSkeleton.module.css"

export const BestSellingSkeleton = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
    </div>
  )
}
