import React from "react";
import { Link } from "react-router-dom";
import fav from "../../assets/heart.svg";
import classes from "./spareItem.module.css";
import { formatNumber } from "../../utils/helpers/formatNumber";
import dummyImage from "../../assets/spare_preview_not_available.svg"
import { CategoryActionButtonGroup } from "../categoryActionButtonGroup/CategoryActionButtonGroup";
import useCartListSparesMutation from "../../tanstack-query/cartList/useCartListSparesMutation";

export const SpareItem = ({ item, onClick }) => {
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
        await mutateAsync(data);
        console.log("Item added to cart successfully.");
      } catch (error) {
        console.error("Error adding item to cart:", error);
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
              {/* <Link className={classes.box__info__fav}>
                <img
                  src={fav}
                  alt="fav"
                  className={classes.box__info__fav__img}
                />
              </Link> */}
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

            <CategoryActionButtonGroup onAdd={handleAddToCart}/>
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