import React from "react";
import vrp from "../../../assets/vrpCartItem.png";

import classes from "./vrpCartItem.module.css";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import { CartActionButtonGroup } from "../CartActionButtonGroup/CartActionButtonGroup";
import useCartListDeleteItemMutation from "../../../tanstack-query/cartList/useCartListDeleteItemMutation";

export const VrpCartItem = ({ item }) => {
  const { mutateAsync: deleteItem, isLoading } =
    useCartListDeleteItemMutation();
  const handleRemove = async () => {
    const { category_id, master_product_id, request_id } = item; // Destructure for clarity

    // Create the payload based on category_id
    const data = {
      category_id,
      ...(category_id === 5 ? { request_id: request_id } : { master_product_id }),
    };

    try {
      await deleteItem(data);
      console.log(data)
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <img src={vrp} alt="item" className={classes.box__img} />
        <div className={classes.box__info__cred}>
          <div className={classes.box__info__cred__title}>
            <h1 className={classes.box__info__cred__title__key}>VRP : </h1>
            <h2 className={classes.box__info__cred__title__value}>
              #{item.lot_id}
            </h2>
          </div>
          <div className={classes.box__info__cred__title}>
            <h1 className={classes.box__info__cred__title__key}>
              Total Phones :
            </h1>
            <h2 className={classes.box__info__cred__title__value}>
              {" "}
              {item.total_phones}
            </h2>
          </div>
          <div className={classes.box__info__cred__asp}>
            <div className={classes.box__info__cred__title}>
              <h1 className={classes.box__info__cred__title__key}>ASP: </h1>
              <h2 className={classes.box__info__cred__title__value}>
                {item.ASP}
              </h2>
            </div>
            <div className={classes.box__info__cred__title}>
              <h1 className={classes.box__info__cred__title__key}>P4%: </h1>
              <h2 className={classes.box__info__cred__title__value}>
                {item.p4_percentage}%
              </h2>
            </div>
          </div>
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
        </div>
      </div>
      <CartActionButtonGroup onRemove={handleRemove} />
    </div>
  );
};
