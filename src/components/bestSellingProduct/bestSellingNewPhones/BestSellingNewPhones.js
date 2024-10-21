import React from "react";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/spare_preview_not_available.svg";
import classes from "./bestSellingNewPhones.module.css";
import { useNavigate } from "react-router-dom";

export const BestSellingNewPhones = ({ newPhones }) => {
  const navigate = useNavigate();

  const navigateToNewPhonesDetail = (requestId) => {
    navigate(`newPhone/${requestId}`);
    console.log(requestId);
  };
  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };
  return (
    <div
      className={classes.box}
      onClick={() => navigateToNewPhonesDetail(newPhones?.id)}
    >
      <span className={classes.box__discount}>
        {newPhones?.discount_percentage}% OFF
      </span>
      <img
        className={classes.box__img}
        alt="newPhones"
        src={newPhones?.image}
        onError={handleImageError}
      />
      <div className={classes.box__content}>
        <h1 className={classes.box__content__title}>
          {newPhones.model} {newPhones.ram}/{newPhones.rom} (
          {newPhones.color})
        </h1>

        <div className={classes.box__content__info__price}>
          <h1 className={classes.box__content__info__price__discount}>
            Rs{" "}
            {newPhones?.discounted_price
              ? formatNumber(newPhones.discounted_price)
              : "N/A"}
          </h1>
          <h2 className={classes.box__content__info__price__original}>
            Rs{" "}
            {newPhones?.original_price
              ? formatNumber(newPhones.original_price)
              : "N/A"}
          </h2>
        </div>
      </div>
    </div>
  );
};
