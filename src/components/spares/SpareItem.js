import React, { useState, useCallback } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useCartListSparesMutation from "../../tanstack-query/cartList/useCartListSparesMutation";
import { formatNumber } from "../../utils/helpers/formatNumber";
import { CategoryActionButtonGroup } from "../categoryActionButtonGroup/CategoryActionButtonGroup";
import dummyImage from "../../assets/dummyPreview.png";
import classes from "./spareItem.module.css";

export const SpareItem = ({ item, onClick, onWishList }) => {
  const [qty, setQty] = useState(item.cart_count);
  const { postCart, patchCart } = useCartListSparesMutation();
  const authToken = Cookies.get("authToken");

  // Handler to add an item to the cart
  const handleQtyChange = useCallback((e) => {
    const value = e.target.value;

    // Allow empty input temporarily or numeric input, but prevent setting zero manually
    if (value === "" || /^[1-9][0-9]*$/.test(value)) {
      setQty(value); // Only allow positive numbers or empty input
    }
  }, []);

  const handleQtyBlur = useCallback(() => {
    setQty((prev) => {
      const parsedValue = parseInt(prev, 10);

      // If value is empty or invalid, set to 1 (to prevent 0)
      if (isNaN(parsedValue) || parsedValue <= 0) {
        return 1;
      }

      // If it's a valid positive value (not zero), return it
      return parsedValue;
    });
  }, []);
  const handleAddToCart = useCallback(
    async (event) => {
      event.stopPropagation();

      // If the quantity is unchanged, exit early
      if (qty === item.cart_count) {
        toast.info("Quantity remains unchanged. No action taken.");
        return;
      }

      // Check if the quantity is zero or negative
      if (qty <= 0) {
        toast.error("Quantity cannot be zero or negative.");
        return;
      }

      const data = {
        category_id: item.category_id,
        master_product_id: item.master_product_id,
        item_id: item.id,
        qty,
      };

      try {
        if (item.cart_count === 0 && qty > 0) {
          // If the previous quantity was 0 (even if it came from the backend) and the user updates it to something greater than 0, post (add to cart)
          const response = await postCart(data);
          toast.success(response.message.displayMessage);
        } else if (item.cart_count > 0 && qty > 0) {
          // If the quantity is being updated but is non-zero, patch (update quantity)
          const response = await patchCart(data);
          toast.success(response.message.displayMessage);
        } else {
          // Handle edge case where qty is 0
          toast.error("Invalid action.");
        }
      } catch (error) {
        setQty(item.cart_count);
        toast.error(
          error.response?.data?.message?.displayMessage || "Error occurred."
        );
      }
    },
    [qty, item, postCart, patchCart]
  );

  // Navigate to spare item details
  const handleSpareDetail = useCallback(() => {
    onClick(item.id);
  }, [item.id, onClick]);

  // Fallback image handler
  const handleImageError = useCallback((e) => {
    e.target.src = dummyImage;
  }, []);

  // Quantity input change handler

  return (
    <div className={classes.container}>
      <div className={classes.container__float}>
        <div className={classes.box} onClick={handleSpareDetail}>
          {/* Image */}
          <div className={classes.box__img}>
            <img
              src={item.image}
              alt={item.part_name}
              className={classes.box_img_pic}
              onError={handleImageError}
            />
          </div>

          {/* Spare details */}
          <div className={classes.box__info}>
            <div className={classes.box__info__container}>
              <h1 className={classes.box__info__title}>{item.part_name}</h1>
            </div>

            {/* Pricing */}
            <div className={classes.box__discount}>
              <h3 className={classes.box__discount__container__discountedPrice}>
                Rs.{formatNumber(item.discounted_price)}
              </h3>
              <h3 className={classes.box__discount__container__price}>
                Rs.{formatNumber(item.original_price)}
              </h3>
              <span className={classes.box__discount__img}>
                {item.discount_percentage}% OFF
              </span>
            </div>

            {/* Quantity */}
            <div className={classes.box__info__qty}>
              <label
                htmlFor={`qty-${item.id}`}
                className={classes.box__info__qty__label}
              >
                Qty:
              </label>
              <input
                type="number"
                id={`qty-${item.id}`}
                className={classes.box__info__qty__input}
                value={qty}
                onChange={handleQtyChange}
                onClick={(e) => e.stopPropagation()} // Prevent triggering click on parent
                onBlur={handleQtyBlur}
              />
            </div>

            {/* Action buttons */}
            <CategoryActionButtonGroup
              onAdd={handleAddToCart}
              isAddedToCart={item.cart_status}
            />
          </div>
        </div>

        {/* Wishlist toggle */}
        {authToken ? (
          <span
            className={
              item.wishlist_status === 1
                ? classes.box__info__fav__active
                : classes.box__info__fav
            }
            onClick={(e) => {
              e.stopPropagation();
              onWishList(item.id);
            }}
          />
        ) : null}
      </div>

      <hr className={classes.box__item__divider} />
    </div>
  );
};
