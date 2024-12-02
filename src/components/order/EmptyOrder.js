import React from "react";
import empty__order from "../../assets/empty_order.svg";
import classes from "./emptyOrder.module.css";
import { useNavigate } from "react-router-dom";

export const EmptyOrder = () => {
  const navigate = useNavigate()

  const handleNavigate=()=>{
    navigate("/")
  }
  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <img
          src={empty__order}
          alt="no orders"
          className={classes.box__info__img}
        />
        <h2 className={classes.box__info__title}>
          Looks like you haven't placed any order yet.
        </h2>
      </div>
      <button className={classes.box__info__btn} onClick={handleNavigate}>Back to product</button>
    </div>
  );
};
