import React from "react";
import { Link } from "react-router-dom";
import navigateArrow from "../../assets/navigateArrow.png";
import classes from "./linkItem.module.css";

export const LinkItem = ({ navigator }) => {
  return (
    <div className={classes.box__wrapper}>
      <Link key={navigator.id} to={navigator.path} className={classes.box}>
        <div className={classes.box__info}>
          <img
            src={navigator.image}
            alt={navigator.name}
            className={classes.box__info__image}
          />
          <span className={classes.box__info__head}>
            <h3 className={classes.box__info__head__title}>
              {navigator.title}
            </h3>
            <h4 className={classes.box__info__head__subTitle}>
              {navigator.subTitle}
            </h4>
          </span>
        </div>
        <img
          src={navigateArrow}
          alt={`go to ${navigator.title}`}
          className={classes.box__info__navigate__image}
        />
      </Link>
      <hr className={classes.box__sep} />
    </div>
  );
};
