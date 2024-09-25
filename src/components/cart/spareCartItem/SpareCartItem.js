import React, { useEffect, useState } from "react";
import { ActionButtonGroup } from "../actionButtonGroup/ActionButtonGroup";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/spare_preview_not_available.svg";
import classes from "./spareCartItem.module.css";
import useCartListChangeQuantityMutation from "../../../tanstack-query/cart/useCartListChangeQuantityMutation";

export const SparesCartItem = ({
  item,
  onRemove,
  onQuantityUpdate,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate: updateQuantity } = useCartListChangeQuantityMutation();

  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };


  const handleQuantityUpdate = (operator) => {
    const originalQuantity = quantity;

    const data = {
      operator,
      category_id: item.category_id,
      master_product_id: item.master_product_id,
    };

    setIsUpdating(true);

    updateQuantity(data, {
      onSuccess: () => {
        if (operator === "increase") {
          setQuantity((prevQuantity) => prevQuantity + 1);
        } else {
          setQuantity((prevQuantity) =>
            prevQuantity > 1 ? prevQuantity - 1 : 1
          );
        }
        setIsUpdating(false); // Remove the loading state
      },
      onError: (error) => {
        console.error("Error updating quantity", error);
        setQuantity(originalQuantity); // Revert to the original quantity on error
        setIsUpdating(false);
      },
    });
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <img
          src={item.image}
          alt="item"
          className={classes.box__img}
          onError={handleImageError}
        />
        <div className={classes.box__info__cred}>
          <div className={classes.box__info__cred__title}>
            <h1 className={classes.box__info__cred__title__head}>
              {item.brand} {item.model}
            </h1>
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
          <div className={classes.box__btns}>
            <button
              className={classes.box__btns__decrement}
              onClick={() => handleQuantityUpdate("decrease")}
              disabled={isUpdating} // Disable while updating
            >
              -
            </button>
            <h3 className={classes.box__btns__value}>{quantity}</h3>
            <button
              className={classes.box__btns__increment}
              onClick={() => handleQuantityUpdate("increase")}
              disabled={isUpdating} // Disable while updating
            >
              +
            </button>
          </div>
        </div>
      </div>

      <ActionButtonGroup onRemove={onRemove} />
    </div>
  );
};
