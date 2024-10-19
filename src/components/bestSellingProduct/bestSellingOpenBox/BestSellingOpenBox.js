import React from "react";
import { formatNumber } from "../../../utils/helpers/formatNumber";

import dummyImage from "../../../assets/spare_preview_not_available.svg";
import classes from "./bestSellingOpenBox.module.css";
import { useNavigate } from "react-router-dom";

export const BestSellingOpenBox = ({ openBox }) => {
  const navigate = useNavigate();

  const navigateToOpenBoxDetail = (requestId) => {
    navigate(`openBox/${requestId}`);
    console.log(requestId);
  };
  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };
  return (
    <div
      className={classes.box}
      onClick={() => navigateToOpenBoxDetail(openBox?.id)}
    >
      <span className={classes.box__discount}>
        {openBox?.discount_percentage}% OFF
      </span>
      <img
        className={classes.box__img}
        alt="openBox"
        src={openBox?.image}
        onError={handleImageError}
      />
      <div className={classes.box__content}>
        <h1 className={classes.box__content__title}>
          {openBox.brand} {openBox.model} {openBox.ram}/{openBox.rom} (
          {openBox.color})
        </h1>

        <div className={classes.box__content__info__price}>
          <h1 className={classes.box__content__info__price__discount}>
            Rs{" "}
            {openBox?.discounted_price
              ? formatNumber(openBox.discounted_price)
              : "N/A"}
          </h1>
          <h2 className={classes.box__content__info__price__original}>
            Rs{" "}
            {openBox?.original_price
              ? formatNumber(openBox.original_price)
              : "N/A"}
          </h2>
        </div>
      </div>
    </div>
  );
};
