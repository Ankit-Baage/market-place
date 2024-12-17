import React, { useState } from "react";

import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/helpers/formatNumber";

import { CartActionButtonGroup } from "../CartActionButtonGroup/CartActionButtonGroup";
import dummyImage from "../../../assets/dummyPreview.png";
import classes from "./openBoxCartItem.module.css";

export const OpenBoxCartItem = ({
  item,
  onQuantityUpdate,
  isUpdating,
  onRemove,
  onLater
}) => {
  const [qty, setQty] = useState(item.quantity);
  const handleQtyChange = (e) => {
    const newQty = e.target.value;
    setQty(newQty); // Update local state
    onQuantityUpdate(newQty); // Pass the new value to the parent
  };
  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <Link to={`/openBox/${item.id}`}>
          <img
            src={item.image}
            alt="item"
            className={classes.box__img}
            onError={handleImageError}
          />
        </Link>

        <div className={classes.box__info__cred}>
        <h2 className={classes.box__info__cred__badge}>Open Box</h2>
          <Link
            to={`/openBox/${item.id}`}
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

          <div className={classes.box__info__qty}>
            <label htmlFor="qty" className={classes.box__info__qty__label}>
              Qty:
            </label>
            <input
              type="number"
              className={classes.box__info__qty__input}
              id="qty"
              value={qty}
              onChange={handleQtyChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>

      <CartActionButtonGroup onRemove={onRemove} isUpdating={isUpdating} onLater={onLater}/>
    </div>
  );
};
