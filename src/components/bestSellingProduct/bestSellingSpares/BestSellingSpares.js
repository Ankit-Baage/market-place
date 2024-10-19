import React from "react";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/spare_preview_not_available.svg";
import classes from "./bestSellingSpares.module.css";
import { useNavigate } from "react-router-dom";

export const BestSellingSpares = ({ spares }) => {
  const navigate = useNavigate();

  const navigateToSparesDetail = (requestId) => {
    navigate(`spares/${requestId}`);
    console.log(requestId);
  };
  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };
  return (
    <div
      className={classes.box}
      onClick={() => navigateToSparesDetail(spares?.id)}
    >
      <span className={classes.box__discount}>
        {spares?.discount_percentage}% OFF
      </span>
      <img
        className={classes.box__img}
        alt="vrp"
        src={spares?.image}
        onError={handleImageError}
      />
      <div className={classes.box__content}>
        <h1 className={classes.box__content__title}>{spares?.part_name}</h1>

        <div className={classes.box__content__info__price}>
          <h1 className={classes.box__content__info__price__discount}>
            Rs{" "}
            {spares?.discounted_price
              ? formatNumber(spares.discounted_price)
              : "N/A"}
          </h1>
          <h2 className={classes.box__content__info__price__original}>
            Rs{" "}
            {spares?.original_price
              ? formatNumber(spares.original_price)
              : "N/A"}
          </h2>
        </div>
      </div>
    </div>
  );
};
