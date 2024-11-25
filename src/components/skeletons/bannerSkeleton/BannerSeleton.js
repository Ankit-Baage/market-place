import React from "react";
import classes from "./bannerSkeleton.module.css";

export const BannerSkeleton = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}></div>
    </div>
  );
};
