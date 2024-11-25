import React from "react";
import classes from "./useProfileSkeleton.module.css";

export const UserProfileSkeleton = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
      <div className={classes.box__info}></div>
    </div>
  );
};
