import React from "react";
import { formatNumber } from "../../../../utils/helpers/formatNumber";
import { Carousel } from "../../../carousel/Carousel";
import classes from "./productInfo.module.css";

export const ProductInfo = ({ productData }) => {
  const product = productData[0];
  console.log(product);
  if (!product) {
    return null;
  }
  return (
    <div>
      {" "}
      <div className={classes.box}>
        <div className={classes.box__info}>
          <div className={classes.box__info__id}>
            <h1 className={classes.box__info__id__title}>Lot Id:</h1>
            <h2 className={classes.box__info__id__num}>#{product?.lot_id}</h2>
          </div>
          <span className={classes.box__info__fav} />
        </div>
        <Carousel />
      </div>
      <div className={classes.box__specs}>
        <div className={classes.box__specs__info}>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>
              Total Phones:
            </h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {product?.total_phones}
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>ASP:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              Rs. {formatNumber(product?.ASP)}
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>Apple:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {product?.apple_percentage}%
            </h2>
          </span>
        </div>
        <div className={classes.box__specs__info__percent}>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>P1:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {product?.p1_percentage}%
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>P2:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {product?.p2_percentage}%
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>P3:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {product?.p3_percentage}%
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>P4: </h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {product?.p4_percentage}%
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>P5:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {product?.p5_percentage}%
            </h2>
          </span>
        </div>
        <div className={classes.box__price}>
          <h3 className={classes.box__price__discount}>
            Rs.{formatNumber(product?.rate_card)}
          </h3>
          {/* <h2 className={classes.box__price__actual}>
            Rate Card
          </h2> */}
          <h2 className={classes.box__price__actual}>
            Rs.{formatNumber(product?.original_price)}
          </h2>
          <span className={classes.box__price_discount__img}>
            {product?.discount_percentage}% DISCOUNT
          </span>
        </div>
        <hr className={classes.box__divider} />
      </div>
    </div>
  );
};
