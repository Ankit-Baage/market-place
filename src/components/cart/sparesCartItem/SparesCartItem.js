import React from "react";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/spare_preview_not_available.svg";
import classes from "./sparesCartItem.module.css";
import { CartActionButtonGroup } from "../CartActionButtonGroup/CartActionButtonGroup";

import { Link } from "react-router-dom";

export const SparesCartItem = ({
  item,
  onUpdateQuantity,
  spareQuantity,
  isUpdating,
  onRemove,
  onLater
}) => {
 
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
        <h2 className={classes.box__info__cred__badge}>Spares</h2>
          <Link
            to={`/home/spares/${item.id}`}
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
            <h2 className={classes.box__info__cred__price__subValue}>
              Rs.{formatNumber(item.original_price)}
            </h2>
            <span className={classes.box__info__cred__price__discount}>
              {item.discount_percentage}% OFF
            </span>
          </div>

          <div className={classes.box__btns}>
            <button
              className={classes.box__btns__decrement}
              onClick={() => onUpdateQuantity("decrease")}
              disabled={isUpdating}
            >
              -
            </button>
            <h3 className={classes.box__btns__value}>{spareQuantity}</h3>
            <button
              className={classes.box__btns__increment}
              onClick={() => onUpdateQuantity("increase")}
              disabled={isUpdating}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <CartActionButtonGroup onRemove={onRemove} isUpdating={isUpdating} onLater={onLater}/>
    </div>
  );
};
