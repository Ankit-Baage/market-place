import React, { useCallback, useState } from "react";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/dummyPreview.png";
import classes from "./sparesCartItem.module.css";
import { CartActionButtonGroup } from "../CartActionButtonGroup/CartActionButtonGroup";

import { Link } from "react-router-dom";
import useCartListSparesMutation from "../../../tanstack-query/cartList/useCartListSparesMutation";
import { toast } from "react-toastify";

export const SparesCartItem = ({
  item,
  onQuantityUpdate,
  isUpdating,
  onRemove,
  onLater,
}) => {
  const [qty, setQty] = useState(item.quantity);
  console.log("spares", item);
  const { patchCart } = useCartListSparesMutation();

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

  const handleUpdateToCart = useCallback(
    async (event) => {
      event.stopPropagation();

      // If the quantity is unchanged, exit early
      if (qty === item.quantity) {
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
        if (item.quantity > 0 && qty > 0) {
          // If the quantity is being updated but is non-zero, patch (update quantity)
          const response = await patchCart(data);
          toast.success(response.message.displayMessage);
        } else {
          // Handle edge case where qty is 0
          toast.error("Invalid action.");
        }
      } catch (error) {
        setQty(item.quantity);
        toast.error(
          error.response?.data?.message?.displayMessage || "Error occurred."
        );
      }
    },
    [qty, item, patchCart]
  );

  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };
  console.log("cartPage: ", item);

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

            {item?.discount_percentage !== 0 && (
              <span className={classes.box__info__cred__price__discount}>
                {item.discount_percentage}% OFF
              </span>
            )}
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
              onBlur={handleQtyBlur}
            />
            <button
              className={classes.box__info__btns__cart}
              onClick={handleUpdateToCart}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <CartActionButtonGroup
        onRemove={onRemove}
        isUpdating={isUpdating}
        onLater={onLater}
      />
    </div>
  );
};
