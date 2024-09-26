import React, { useState } from "react";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/spare_preview_not_available.svg";
import classes from "./sparesCartItem.module.css";
import { CartActionButtonGroup } from "../CartActionButtonGroup/CartActionButtonGroup";
import useCartListDeleteItemMutation from "../../../tanstack-query/cartList/useCartListDeleteItemMutation";
import useCartListQuantityMutation from "../../../tanstack-query/cartList/useCartListQuantityMutation";
import { toast } from "react-toastify";

export const SparesCartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation();
  const { mutate: updateQuantity } = useCartListQuantityMutation();

  const handleQuantityUpdate = (operator) => {
    const originalQuantity = quantity;

    const data = {
      operator,
      category_id: item.category_id,
      master_product_id: item.master_product_id,
    };

    // Optimistically update quantity in UI

    // Show a loading state
    setIsUpdating(true);

    updateQuantity(data, {
      onSuccess: (response) => {
        if (operator === "increase") {
          setQuantity((prevQuantity) => prevQuantity + 1);
        } else {
          setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
        }
        setIsUpdating(false);
        console.log(response)
        toast.success(response.message.displayMessage);
      },
      onError: (error) => {
        console.log("Error updating quantity", error);
        toast.error(error.response.data.message.displayMessage);
        setQuantity(originalQuantity);
        setIsUpdating(false);
      },
    });
  };

  const handleRemove = async () => {
    const { category_id, master_product_id, request_id } = item;

    const data = {
      category_id,
      ...(category_id === 5
        ? { request_id: request_id }
        : { master_product_id }),
    };

    try {
      await deleteItem(data);
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  const handleImageError = (e) => {
    e.target.src = dummyImage;
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

      <CartActionButtonGroup onRemove={handleRemove} />
    </div>
  );
};
