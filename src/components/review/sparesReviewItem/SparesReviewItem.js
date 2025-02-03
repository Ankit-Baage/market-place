import React from "react";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/dummyPreview.png";

import { Link } from "react-router-dom";
import classes from "./sparesReviewItem.module.css";

export const SparesReviewItem = ({ item }) => {
  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <Link to={`/spares/${item.id}`}>
          <img
            src={item.image}
            alt="item"
            className={classes.box__img}
            onError={handleImageError}
          />
        </Link>

        <div className={classes.box__info__cred}>
          <h2 className={classes.box__info__cred__badge}>Spares</h2>
          <Link
            to={`/spares/${item.id}`}
            className={classes.box__info__cred__title}
          >
            <h1 className={classes.box__info__cred__title__head}>
              {item.part_name}
            </h1>
            <h2
              className={classes.box__info__cred__title__color}
            >{`(${item.color})`}</h2>
          </Link>

          <div className={classes.box__info__cred__price}>
            <h1 className={classes.box__info__cred__price__value}>
              Rs.{formatNumber(item.discounted_price)}
            </h1>
            {item?.discount_percentage !== 0 && (
              <h2 className={classes.box__info__cred__price__subValue}>
                Rs.{formatNumber(item.original_price)}
              </h2>
            )}

            {item.discount_percentage !== 0 && (
              <span className={classes.box__info__cred__price__discount}>
                {item.discount_percentage}% OFF
              </span>
            )}
          </div>

          <div className={classes.box__qty}>
            <h2 className={classes.box__qty__key}>Qty:</h2>
            <h3 className={classes.box__qty__value}>{item.quantity}</h3>
          </div>
        </div>
      </div>

      <hr className={classes.box__sep} />
    </div>
  );
};
