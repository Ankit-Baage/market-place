import React from "react";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/spare_preview_not_available.svg";
import classes from "./newPhoneCartItem.module.css";
import { CartActionButtonGroup } from "../CartActionButtonGroup/CartActionButtonGroup";

import { Link } from "react-router-dom";

export const NewPhoneCartItem = ({
  item,
  onUpdateQuantity,
  newPhoneQuantity,
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
        <Link to={`/home/newPhone/${item.id}`}>
          <img
            src={item.image}
            alt="item"
            className={classes.box__img}
            onError={handleImageError}
          />
        </Link>

        <div className={classes.box__info__cred}>
        <h2 className={classes.box__info__cred__badge}>New Phone</h2>
          <Link
            to={`/home/newPhone/${item.id}`}
            className={classes.box__info__cred__title}
          >
            <h1 className={classes.box__info__cred__title__head}>
              {item.model}
            </h1>
            <h2
              className={classes.box__info__cred__title__color}
            >{`(${item.ram}/${item.rom}, ${item.color})`}</h2>
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
            <h3 className={classes.box__btns__value}>{newPhoneQuantity}</h3>
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
