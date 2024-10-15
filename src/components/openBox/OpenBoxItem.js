import React from "react";
import { Link } from "react-router-dom";
import fav from "../../assets/heart.svg";
import classes from "./openBoxItem.module.css";
import { formatNumber } from "../../utils/helpers/formatNumber";
import dummyImage from "../../assets/spare_preview_not_available.svg";
import { CategoryActionButtonGroup } from "../categoryActionButtonGroup/CategoryActionButtonGroup";
import useCartListSparesMutation from "../../tanstack-query/cartList/useCartListSparesMutation";
import { toast } from "react-toastify";

export const OpenBoxItem = ({ item, onClick, onWishList }) => {
  const { mutateAsync, isLoading, isSuccess, isPending } =
  useCartListSparesMutation();

  const handleAddToCart = async (event) => {
    event.stopPropagation()
    const data = {
      category_id: item.category_id,
      master_product_id: item.master_product_id,
      item_id: item.id,
    };

    try {
      const response = await mutateAsync(data);
      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.error(error.response.data.message.displayMessage);
    }
  };
  const handleNewPhoneDetail = (id) => {
    onClick(id);
  };

  const handleImageError = (e) => {
    e.target.src = dummyImage;
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
              onError={handleImageError}
            />
          </div>
          <div className={classes.box__info}>
            <div className={classes.box__info__container}>
              {/* <h1 className={classes.box__info__title}>{item.brand}</h1> */}
              <h1
                className={classes.box__info__title}
              >{`${item.model} ${item.ram}/${item.rom} (${item.color})`}</h1>
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
                {item.discount_percentage}% OFF
              </span>
            </div>

            <CategoryActionButtonGroup onAdd={handleAddToCart} isAddedToCart={item.cart_status}/>
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
