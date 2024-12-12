import React from "react";
import classes from "./spareItem.module.css";
import { formatNumber } from "../../utils/helpers/formatNumber";
import dummyImage from "../../assets/dummyPreview.png";
import { CategoryActionButtonGroup } from "../categoryActionButtonGroup/CategoryActionButtonGroup";
import useCartListSparesMutation from "../../tanstack-query/cartList/useCartListSparesMutation";
import { toast } from "react-toastify";

export const SpareItem = ({ item, onClick, onWishList }) => {
  const { mutateAsync, isLoading, isSuccess, isPending } =
    useCartListSparesMutation();

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    const data = {
      category_id: item.category_id,
      master_product_id: item.master_product_id,
      item_id: item.id,
      qty:2
    };

    try {
      const response = await mutateAsync(data);
      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.error(error.response.data.message.displayMessage);
    }
  };

  const handleSpareDetail = (id) => {
    onClick(id);
  };
  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };
  return (
    <div className={classes.container}>
      <div className={classes.container__float}>
        <div className={classes.box} onClick={() => handleSpareDetail(item.id)}>
          <div className={classes.box__img}>
            <img
              src={item.image}
              alt={item.part_name}
              className={classes.box_img_pic}
              onError={handleImageError}
            />
          </div>
          <div className={classes.box__info}>
            <div className={classes.box__info__container}>
              <h1 className={classes.box__info__title}>{item.part_name}</h1>
            </div>

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
            <div className={classes.box__info__qty}>
              <label
                htmlFor="qty"
                className={classes.box__info__qty__label}
              >Qty:</label>
              <input
                type="number"
                className={classes.box__info__qty__input}
                defaultValue="1"
                id="qty"
              />
            </div>

            <CategoryActionButtonGroup
              onAdd={handleAddToCart}
              isAddedToCart={item.cart_status}
            />
          </div>
        </div>
        <span
          className={
            item.wishlist_status === 1
              ? classes.box__info__fav__active
              : classes.box__info__fav
          }
          onClick={onWishList}
        />
      </div>

      <hr className={classes.box__item__divider} />
    </div>
  );
};
