import React from "react";
import { formatNumber } from "../../../../utils/helpers/formatNumber";
import { Carousel } from "../../../carousel/Carousel";
import classes from "./productInfo.module.css";
import { Advertisement } from "../../../vrpItem/advertisement/Advertisement";
import vrpAdd from "../../../../assets/vrpAdd.png";

export const ProductInfo = ({ productData }) => {
  // const product = productData[0];
  // console.log(product);
  // if (!product) {
  //   return null;
  // }
  return (
    <div>
      {" "}
      <div className={classes.box}>
        <div className={classes.box__info}>
          <div className={classes.box__info__id}>
            <h1 className={classes.box__info__id__title}>Lot Id:</h1>
            <h2 className={classes.box__info__id__num}>
              #{productData?.lot_id}
            </h2>
          </div>
          <span className={classes.box__info__fav} />
        </div>
        {/* <Carousel /> */}
        <Advertisement image={vrpAdd} />
      </div>
      <div className={classes.box__specs}>
        <div className={classes.box__specs__info}>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>
              Total Phones:
            </h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {productData?.total_phones}
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>ASP:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {productData?.ASP
                ? `Rs. ${formatNumber(productData?.ASP)}`
                : productData?.ASP}
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>Apple:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {productData?.apple_percentage}%
            </h2>
          </span>
        </div>
        <div className={classes.box__specs__info__percent}>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>P1:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {productData?.p1_percentage}%
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>P2:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {productData?.p2_percentage}%
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>P3:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {productData?.p3_percentage}%
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>P4: </h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {productData?.p4_percentage}%
            </h2>
          </span>
          <span className={classes.box__specs__info__box}>
            <h1 className={classes.box__specs__info__box__title}>P5:</h1>
            <h2 className={classes.box__specs__info__box__title__value}>
              {" "}
              {productData?.p5_percentage}%
            </h2>
          </span>
        </div>
        <div className={classes.box__price}>
          <h3 className={classes.box__price__discount}>
            {productData?.rate_card
              ? `Rs. ${formatNumber(productData?.rate_card)}`
              : productData?.rate_card}
          </h3>
          {/* <h2 className={classes.box__price__actual}>
            Rate Card
          </h2> */}
          <h2 className={classes.box__price__actual}>
            {productData?.original_price
              ? `Rs. ${formatNumber(productData?.original_price)}`
              : productData?.original_price}
          </h2>
          <span className={classes.box__price_discount__img}>
            {productData?.discount_percentage}% DISCOUNT
          </span>
        </div>
        <hr className={classes.box__divider} />
      </div>
    </div>
  );
};
