import React from "react";
import vrpCart from "../../../assets/vrpCart.svg";
import classes from "./vrpCartItem.module.css";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import { ActionButtonGroup } from "../actionButtonGroup/ActionButtonGroup";

export const VrpCartItem = ({ item, onRemove }) => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <img src={vrpCart} alt="vrp" className={classes.box__info__img} />

        <div className={classes.box__info__product}>
          <div className={classes.box__vrp}>
            <h1 className={classes.box__vrp__title}>VRP :</h1>
            <h2 className={classes.box__vrp__title__value}>#{item.lot_id}</h2>
          </div>
          <div className={classes.box__vrp}>
            <h1 className={classes.box__vrp__title}>Total Phones : </h1>
            <h2 className={classes.box__vrp__title__value}>{item.total_phones}</h2>
          </div>
          <div className={classes.box__vrp__asp}>
            <div className={classes.box__vrp}>
              <h1 className={classes.box__vrp__title}>ASP</h1>
              <h2 className={classes.box__vrp__title__value}>{item.ASP}</h2>
            </div>
            <div className={classes.box__vrp}>
              <h1 className={classes.box__vrp__title}>P4%</h1>
              <h2 className={classes.box__vrp__title__value}>{item.p4_percentage}%</h2>
            </div>
          </div>
          <div className={classes.box__vrp__price}>
            <h3 className={classes.box__vrp__price__original}>Rs.{formatNumber(item.discounted_price)}</h3>
            <h4 className={classes.box__vrp__price__discount}>Rs.{formatNumber(item.original_price)}</h4>
            <span className={classes.box__vrp__price__discount__img}>43% Discount</span>
          </div>
        </div>
      </div>
      <ActionButtonGroup onRemove={onRemove}/>
    </div>
  );
};
