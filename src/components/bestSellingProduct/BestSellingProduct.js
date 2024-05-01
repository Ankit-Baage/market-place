import React from "react";
import classes from "./bestSellingProduct.module.css";

export const BestSellingProduct = ({ productData }) => {
  return (
    <div className={classes.box}>
      <img
        src={productData.image}
        className={classes.box__img}
        alt={productData.id}
      />
      <h1 className={classes.box__info__name}>{productData.name}</h1>

      <div className={classes.box__info}>
        <h1 className={classes.box__info__title}>Starting From</h1>
        <h2
          className={classes.box__info__price}
        >{`Rs.${productData.price}`}</h2>
      </div>
    </div>
  );
};
