import React from "react";
import vrp from "../../assets/vrpCartItem.png";
import classes from "./vrpItem.module.css";
import { formatNumber } from "../../utils/helpers/formatNumber";
import dummyImage from "../../assets/spare_preview_not_available.svg";
import { CategoryActionButtonGroup } from "../categoryActionButtonGroup/CategoryActionButtonGroup";
import useCartListSparesMutation from "../../tanstack-query/cartList/useCartListSparesMutation";
import { toast } from "react-toastify";

export const VrpItem = ({ item, index, totalItems, onClick, onWishList }) => {
  const { mutateAsync, isLoading, isSuccess, isPending } =
    useCartListSparesMutation();

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    const data = {
      category_id: item.category_id,
      request_id: item.request_id,
    };

    try {
      const response = await mutateAsync(data);
      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.error(error.response.data.message.displayMessage);
    }
  };

  const handleVrpDetail = (requestId) => {
    onClick(requestId);
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.box}
        onClick={() => handleVrpDetail(item.request_id)}
      >
        <div className={classes.box__img}>
          <img src={vrp || dummyImage} alt="VRP" />
        </div>
        <div className={classes.box__info}>
          <div className={classes.box__info__content}>
            <div className={classes.box__info__container}>
              <div className={classes.box__info__id}>
                <h1 className={classes.box__info__id__title}>Lot ID:</h1>
                <h2 className={classes.box__info__id__number}>
                  #{item.lot_id}
                </h2>
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
            <div className={classes.box__info__quant}>
              <h1 className={classes.box__info__id__title}>Total Phones:</h1>
              <h2 className={classes.box__info__id__number}>
                {item.total_phones}
              </h2>
            </div>
            <div className={classes.box__info__percent}>
              <div className={classes.box__info__quant}>
                <h1 className={classes.box__info__id__title}>ASP:</h1>
                <h2 className={classes.box__info__id__number}>
                  Rs {formatNumber(item.ASP)}
                </h2>
              </div>
              <div className={classes.box__info__quant}>
                <h1 className={classes.box__info__id__title}>P4:</h1>
                <h2 className={classes.box__info__id__number}>
                  {item.p4_percentage}%
                </h2>
              </div>
              <div className={classes.box__info__quant}>
                <h1 className={classes.box__info__id__title}>Apple:</h1>
                <h2 className={classes.box__info__id__number}>
                  {item.apple_percentage}%
                </h2>
              </div>
            </div>
            {item["5g_percentage"] && (
              <div className={classes.box__info__quant}>
                <h1 className={classes.box__info__id__title}>5G Phones:</h1>
                <h2 className={classes.box__info__id__number}>
                  {item["5g_percentage"]}%
                </h2>
              </div>
            )}

            <div className={classes.box__discount}>
              <div className={classes.box__discount__container}>
                <h3 className={classes.box__discount__container__price__disc}>
                  Rs {formatNumber(item.rate_card)}
                </h3>
                <h3 className={classes.box__discount__container__price}>
                  Rs {formatNumber(item.original_price)}
                </h3>
              </div>
              <span className={classes.box__discount__img}>
                {item.discount_percentage}% OFF
              </span>
            </div>
          </div>
          <CategoryActionButtonGroup
            onAdd={handleAddToCart}
            isAddedToCart={item.cart_status}
          />
        </div>
      </div>

      {index === totalItems - 1 ? null : (
        <hr className={classes.box__item__divider} />
      )}
    </div>
  );
};
