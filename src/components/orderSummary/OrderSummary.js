import React from "react";
import classes from "./orderSummary.module.css";
import { formatNumber } from "../../utils/helpers/formatNumber";

export const OrderSummary = ({ subTotal, gst, grandTotal, couponAmount, couponCode , originalAmount}) => {
  return (
    <div className={classes.box}>
      <h1 className={classes.box__title}>Bill Details</h1>
      <hr className={classes.box__sep} />
      <div className={classes.box__content}>
        <h2 className={classes.box__content__key}>Subtotal</h2>

        <div className={classes.box__content__wrapper}>
          <h3 className={classes.box__content__value__original}>{originalAmount}</h3>
          <div></div>
          <h3 className={classes.box__content__value}>{subTotal}</h3>
        </div>
      </div>
      {couponCode && <div className={classes.box__content}>
        <h2 className={classes.box__content__key}>Coupon Saving</h2>
        <h3 className={classes.box__content__coupon__value}>
          -Rs.{couponAmount ? formatNumber(couponAmount): ""}
        </h3>
      </div>}
      <div className={classes.box__content}>
        <h2 className={classes.box__content__key}>Shipping Fee</h2>

        <div className={classes.box__content__wrapper}>
          <h3 className={classes.box__content__value__original}>Rs.280</h3>
          <div></div>
          <h3 className={classes.box__content__value}>Rs.200</h3>
        </div>
      </div>
      <div className={classes.box__content}>
        <h2 className={classes.box__content__key}>Gst</h2>
        <h3 className={classes.box__content__value}>Rs.{gst ? formatNumber(gst) :""}</h3>
      </div>
      <hr className={classes.box__sep} />
      <div className={classes.box__content}>
        <h2 className={classes.box__content__key__total}>Grand Total</h2>
        <h3 className={classes.box__content__value__total}>
          Rs.{grandTotal ? formatNumber(grandTotal):""}
        </h3>
      </div>
    </div>
  );
};
