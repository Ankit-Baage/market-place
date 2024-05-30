import React from "react";
import { ProductCarousel } from "../../ui/productCarousel/ProductCarousel";
import classes from "./spareDetail.module.css";
import { SpareColors } from "../spareColor/SpareColors";
import { SparePrice } from "../sparePrice/SparePrice";
import { SpareHighlights } from "../spareHilights/SpareHighlights";
import { SpareOffers } from "../spareoffers/SpareOffers";

export const SpareDetail = ({
  images,
  prices,
  colors,
  descriptions,
  color,
  spareData,
  partName
}) => {
  // let colors = ["Black", "Gray", "Dark Gray"]
  return (
    <div className={classes.box}>
      <div className={classes.box__spareIntro}>
        <ProductCarousel imageData={images} />
        <div className={classes.box__spareName}>
          <h1 className={classes.box__spareName__title}>{partName}</h1>
          <h2 className={classes.box__spareName__subtitle}>New</h2>
          <hr className={classes.box__item__divider} />
        </div>
      </div>
      <SpareColors colors={colors} color={color} />
      <SparePrice prices={prices} />
      <SpareHighlights highlights={descriptions} />
      <SpareOffers />
      <div className={classes.box__otherSellers}>
        <div className={classes.box__otherSellers__container}>
          <div className={classes.box__otherSellers__info}>
            <h2 className={classes.box__otherSellers__info__title}>
              Other Sellers on MobiGarage{" "}
            </h2>
            <h3 className={classes.box__otherSellers__info__subtitle}>
              Starting from
            </h3>
            <h4 className={classes.box__otherSellers__info__price}>
              Rs.45,250
            </h4>
          </div>
          <span className={classes.box__otherSellers__arrow} />
        </div>
        <hr className={classes.box__item__divider} />
      </div>
      <div className={classes.box__btns}>
        <button
          className={`${classes.box__btns__btn} ${classes.box__btns__add}`}
        >Add to Cart</button>
        <button
          className={`${classes.box__btns__btn} ${classes.box__btns__buy}`}
        >Buy Now</button>
      </div>
    </div>
  );
};
