import React from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/spare_preview_not_available.svg";

import classes from "./sparesWishListItem.module.css";
import { WishListActionButtonGroup } from "../wishListActionButtonGroup/WishListActionButtonGroup";

export const SparesWishListItem = ({ item, isUpdating, onRemove, onMove }) => {
  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <Link to={`/home/spares/${item.id}`}>
          <img
            src={item.image}
            alt="item"
            className={classes.box__img}
            onError={handleImageError}
          />
        </Link>

        <div className={classes.box__info__cred}>
          <div className={classes.box__info__cred__content}>
            <span className={classes.box__info__cred__content__title}>
              Spares
            </span>
            <span className={classes.box__info__cred__img}></span>
          </div>
          <Link
            to={`/home/spares/${item.id}`}
            className={classes.box__info__cred__title}
          >
            <h1 className={classes.box__info__cred__title__head}>
              {`${item.part_name}(${item.color})`}
            </h1>
          </Link>

          <div className={classes.box__info__cred__price}>
            <h1 className={classes.box__info__cred__price__value}>
              Rs.{formatNumber(item.discounted_price)}
            </h1>
            <h2 className={classes.box__info__cred__price__subValue}>
              Rs.{formatNumber(item.original_price)}
            </h2>
            <span className={classes.box__info__cred__price__discount}>
              {item.discount_percentage}% Discount
            </span>
          </div>
          <WishListActionButtonGroup
            onRemove={onRemove}
            isUpdating={isUpdating}
            onMove={onMove}
          />
        </div>
      </div>
      <hr className={classes.box__sep} />
    </div>
  );
};
