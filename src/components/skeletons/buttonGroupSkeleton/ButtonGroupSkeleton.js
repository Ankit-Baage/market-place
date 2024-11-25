import React from "react";
import classes from "./buttonGroupSkeleton.module.css";

export const ButtonGroupSkeleton = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
    </div>
  );
};
