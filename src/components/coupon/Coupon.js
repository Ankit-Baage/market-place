import React from "react";
import classes from "./coupon.module.css";

export const Coupon = ({ coupon }) => {
  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <div className={classes.box__content__info}>
          <h1 className={classes.box__content__info__title}>{coupon.code}</h1>
          <h2 className={classes.box__content__info__subTitle}>
            min order value
            <span className={classes.box__content__info__subTitle__highLighted}>
              {coupon.min_order_value}
            </span>
          </h2>
        </div>
        <button className={classes.box__content__btn}>Apply</button>
      </div>
      <hr className={classes.box__sep} />
      <p className={classes.box__content__info__para}>
        {coupon.descrption}
      </p>
    </div>
  );
};
