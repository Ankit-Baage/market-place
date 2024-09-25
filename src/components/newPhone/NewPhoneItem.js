import React from "react";
import { Link } from "react-router-dom";
import fav from "../../assets/heart.svg";
import classes from "./newPhoneItem.module.css";
import { formatNumber } from "../../utils/helpers/formatNumber";
import { ItemActionButton } from "../itemActionButton/ItemActionButton";

export const NewPhoneItem = ({ item, onClick, onAddToCart }) => {
  const handleNewPhoneDetail = (id) => {
    onClick(id);
  };
  return (
    <div className={classes.container}>
      <div className={classes.container__float}>
        <div
          className={classes.box}
          onClick={() => handleNewPhoneDetail(item.id)}
        >
          <div className={classes.box__img}>
            <img
              src={item.image}
              alt={item.part_name}
              className={classes.box_img_pic}
            />
          </div>
          <div className={classes.box__info}>
            <div className={classes.box__info__container}>
              {/* <h1 className={classes.box__info__title}>{item.brand}</h1> */}
              <h1 className={classes.box__info__title}>{`${item.model} ${item.ram}/${item.rom} (${item.color})`}</h1>
            </div>

            <div className={classes.box__discount}>
              <h3 className={classes.box__discount__container__discountedPrice}>
                Rs.{formatNumber(item.discounted_price)}
              </h3>

              <h3 className={classes.box__discount__container__price}>
                Rs.{formatNumber(item.original_price)}
              </h3>
              {/* </div> */}
              <span className={classes.box__discount__img}>
                {item.discount_percentage}% DISCOUNT
              </span>
            </div>

            <ItemActionButton onAdd={onAddToCart}/>
          </div>
        </div>
        <Link className={classes.box__info__fav}>
          <img src={fav} alt="fav" className={classes.box__info__fav__img} />
        </Link>
      </div>

      <hr className={classes.box__item__divider} />
    </div>
  );
};
