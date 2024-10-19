import React from "react";
import vrpBestSelling from "../../../assets/vrpBestSelling.svg";
import classes from "./bestSellingVrp.module.css";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import { useNavigate } from "react-router-dom";

export const BestSellingVrp = ({ vrp }) => {
  const navigate = useNavigate();

  const navigateToVrpDetail = (requestId) => {
    navigate(`vrp/${requestId}`);
    console.log(requestId);
  };

  return (
    <div
      className={classes.box}
      onClick={() => navigateToVrpDetail(vrp?.request_id)}
    >
      <span className={classes.box__discount}>
        {vrp?.discount_percentage}% OFF
      </span>
      <img
        className={classes.box__img}
        alt={vrp?.request_id}
        src={vrpBestSelling}
      />
      <div className={classes.box__content}>
        <h1 className={classes.box__content__title}>
          VRP No. #{vrp?.request_id}
        </h1>

        <div className={classes.box__content__info__container}>
          <h1 className={classes.box__content__info__container__key}>P4 :-</h1>
          <h2 className={classes.box__content__info__container__value}>
            {vrp?.p4_percentage}%
          </h2>
        </div>
        <div className={classes.box__content__info__container}>
          <h1 className={classes.box__content__info__container__key}>ASP :-</h1>
          <h2 className={classes.box__content__info__container__value}>
            {vrp?.ASP}
          </h2>
        </div>
        <div className={classes.box__content__info__container}>
          <h1 className={classes.box__content__info__container__key}>
            Apple% :-
          </h1>
          <h2 className={classes.box__content__info__container__value}>
            {vrp?.apple_percentage}%
          </h2>
        </div>

        <div className={classes.box__content__info__container}>
          <h1 className={classes.box__content__info__container__key}>
            #Phones :-
          </h1>
          <h2 className={classes.box__content__info__container__value}>
            {vrp?.total_phones}
          </h2>
        </div>

        <div className={classes.box__content__info__price}>
          <h1 className={classes.box__content__info__price__discount}>
            Rs {vrp?.rate_card ? formatNumber(vrp.rate_card) : "N/A"}
          </h1>
          <h2 className={classes.box__content__info__price__original}>
            Rs {vrp?.original_price ? formatNumber(vrp.original_price) : "N/A"}
          </h2>
        </div>
      </div>
    </div>
  );
};
