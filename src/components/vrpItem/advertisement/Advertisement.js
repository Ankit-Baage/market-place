import React from "react";
import classes from "./advertisement.module.css";

export const Advertisement = ({ image }) => {
  return (
    <div className={classes.box}>
      <img
        src={image}
        alt="advertisement"
        className={classes.box__img}
      />
    </div>
  );
};
