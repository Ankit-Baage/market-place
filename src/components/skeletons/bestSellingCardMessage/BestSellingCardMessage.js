import React from "react";
import bestSellingImage from "../../../assets/bestSelling__comingSoon.png";
import classes from "./bestSellingCardMessage.module.css";

export const BestSellingCardMessage = ({message}) => {
  return (
    <div className={classes.box}>
      <img src={bestSellingImage} alt="coming soon" className={classes.box__img}/>
      <div className={classes.box__content}>
        <h1 className={classes.box__content__text}>Coming Soon</h1>
        <h2 className={classes.box__content__text__sub}>
        Exciting products are coming soon—stay 
        tuned for the best deals!
        </h2>
      </div>
    </div>
  );
};
