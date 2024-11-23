import React from "react";
import orderSuccess from "../../assets/orderSuccess.svg";
import classes from "./orderSuccess.module.css";
import { Link, useNavigate } from "react-router-dom";

export const OrderSuccess = () => {
  const navigate =useNavigate();
  const handleNavigate=()=>{
    navigate("/")

  }
  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <img
          src={orderSuccess}
          alt="success"
          className={classes.box__content__success}
        />
        <h1 className={classes.box__content__title}>Your order is placed successfully.</h1>
        <h2 className={classes.box__content__subTitle}>
          Feel free to track your order from <Link to="/profileInfo/orders" className={classes.box__content__link}>My Orders</Link>
        </h2>
      </div>
      <button className={classes.box__content__btn} onClick={handleNavigate}>Continue Shopping</button>
    </div>
  );
};
