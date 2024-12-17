import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import classes from "./cartPage.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";

import { VrpCartItem } from "../../components/cart/vrpCartItem/VrpCartItem";
import useGetCartList from "../../tanstack-query/cartList/useGetCartList";
import { SparesCartItem } from "../../components/cart/sparesCartItem/SparesCartItem";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import { OpenBoxCartItem } from "../../components/cart/openBoxCartItem/OpenBoxCartItem";
import { NewPhoneCartItem } from "../../components/cart/newPhoneCartItem/NewPhoneCartItem";
import { toast } from "react-toastify";
import useCartListDeleteItemMutation from "../../tanstack-query/cartList/useCartListDeleteItemMutation";
import useCartListQuantityMutation from "../../tanstack-query/cartList/useCartListQuantityMutation";
import useMoveToLaterMutation from "../../tanstack-query/cartList/useMoveToLaterMutation";
import { EmptyCart } from "../../components/cart/EmptyCart";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OrderSummary } from "../../components/orderSummary/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  couponAdded,
  couponRemoved,
  selectCouponState,
} from "../../store/coupon/couponSlice";

export const CartPage = () => {
  const dispatch = useDispatch();
  const coupon = useSelector(selectCouponState);
  const guestId = Cookies.get("guestId");
  const { data, isSuccess, isLoading } = useGetCartList(coupon.id, guestId);
  const navigate = useNavigate();
  const [qty, setQty] = useState(data?.data?.data?.quantity);

  const handleQuantityUpdate = (newQty) => {
    setQty(newQty);
    console.log("cart_page updated Quantity:", newQty);
  };

  // const [localQuantities, setLocalQuantities] = useState({});
  // const [isUpdating, setIsUpdating] = useState(false);

  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation();
  // const { mutate: updateQuantity } = useCartListQuantityMutation();
  const {
    mutateAsync,
    isLoading: isMoving,
    isSuccess: IsMoved,
    isPending,
  } = useMoveToLaterMutation();

  const placeholder = "Search...";

  const handleRemove = useCallback(
    async (item) => {
      const { category_id, master_product_id, request_id } = item;

      const data = {
        category_id,
        ...(category_id === 5 ? { request_id } : { master_product_id }),
      };

      // setIsUpdating(true);

      try {
        const response = await deleteItem(data);
        toast.success(response.message.displayMessage);
        console.log(response.message.displayMessage);
      } catch (error) {
        toast.error(error.response.data.message.displayMessage);
      } finally {
        // setIsUpdating(false);
      }
    },
    [deleteItem] // Dependencies for useCallback
  );

  const handleSaveForLater = useCallback(
    async (item) => {
      const payload = {
        category_id: item.category_id,
        ...(item.category_id !== 5 && {
          master_product_id: item.master_product_id,
        }),
        ...(item.category_id !== 5 && { item_id: item.id }),
        ...(item.category_id === 5 && { request_id: item.request_id }),
      };

      try {
        const response = await mutateAsync(payload);
        toast.success(response.message.displayMessage);
        console.log(item);
      } catch (error) {
        toast.error(error.response.data.message.displayMessage);
      }
    },
    [mutateAsync]
  );
  const handleNavigateToCoupons = () => {
    navigate("/coupons");
  };

  const handleNavigateToAddresses = () => {
    navigate("/address");
  };
  const handleRemoveCoupon = () => {
    dispatch(couponRemoved());
    setSearchParams((params) => {
      params.delete("coupon");
      return params;
    });
  };

  const content = useMemo(() => {
    if (isLoading) {
      return <CartLoader />;
    }
    if (isSuccess && data?.data?.data?.cart_items.length > 0) {
      return data.data.data.cart_items.map((item) => {
        switch (item.category_id) {
          case 5:
            return (
              <VrpCartItem
                key={item.request_id}
                item={item}
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
              />
            );
          case 6:
            return (
              <SparesCartItem
                key={item.id}
                item={item}
                onQuantityUpdate={(newQty) => handleQuantityUpdate(newQty)}
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
              />
            );
          case 7:
            return (
              <NewPhoneCartItem
                item={item}
                onQuantityUpdate={(newQty) => handleQuantityUpdate(newQty)}
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
              />
            );
          case 8:
            return (
              <OpenBoxCartItem
                item={item}
                onQuantityUpdate={(newQty) => handleQuantityUpdate(newQty)}
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
              />
            );
          default:
            return null;
        }
      });
    }
    return <EmptyCart />;
  }, [data?.data?.data?.cart_items, handleRemove, handleSaveForLater, isLoading, isSuccess]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const couponIdFromUrl = searchParams.get("coupon");

    if (couponIdFromUrl) {
      dispatch(
        couponAdded({
          id: couponIdFromUrl,
        })
      );
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (isSuccess) {
      const couponCode = data?.data?.data?.applied_coupon_code;

      setSearchParams((params) => {
        if (couponCode) {
          params.set("coupon", coupon.id);
        } else {
          params.delete("coupon");
          dispatch(couponRemoved());
        }

        return params;
      });
    } else {
      setSearchParams((params) => {
        params.delete("coupon");
        return params;
      });
    }
  }, [coupon.id, data, dispatch, isSuccess, setSearchParams]);
  console.log("couponId :", coupon.id);

  return isSuccess ? (
    <div className={classes.box}>
      <SearchBar placeholder={placeholder} />
      <div className={classes.box__cart}>{content}</div>
      {isSuccess && data?.data?.data?.cart_items.length > 0 && (
        <div className={classes.box__cart}>
          <h3 className={classes.box__cart__order}>Order Summary</h3>
          {!data?.data?.data?.applied_coupon_code && (
            <button
              className={classes.box__coupons}
              onClick={handleNavigateToCoupons}
            >
              <div className={classes.box__coupons__content}>
                <span className={classes.box__coupons__content__img} />
                <h3 className={classes.box__coupons__content__title}>
                  Use Coupons
                </h3>
              </div>

              <span className={classes.box__coupons__navigate} />
            </button>
          )}

          {data?.data?.data?.applied_coupon_code && (
            <div className={classes.box__coupons__applied}>
              <div className={classes.box__coupons__content}>
                <span className={classes.box__coupons__content__img} />
                <div className={classes.box__coupons__applied__content}>
                  <h3 className={classes.box__coupons__content__applied__title}>
                    Coupon applied...
                  </h3>
                  <h3 className={classes.box__coupons__content__subTitle}>
                    {data?.data?.data?.applied_coupon_code}
                  </h3>
                </div>
              </div>

              <button
                className={classes.box__coupons__remove}
                onClick={handleRemoveCoupon}
              >
                Remove
              </button>
            </div>
          )}

          <OrderSummary
            subTotal={data?.data?.data.total_amount}
            gst={data?.data?.data?.gst_amount}
            grandTotal={data?.data?.data?.final_amount}
            couponAmount={data?.data?.data?.applied_coupon_amount}
            couponCode={data?.data?.data?.applied_coupon_code}
            originalAmount={data?.data?.data?.original_amount}
          />
          <button
            className={classes.box__cart__order__btn}
            onClick={handleNavigateToAddresses}
          >
            Select Address
          </button>
        </div>
      )}
    </div>
  ) : (
    <CartLoader />
  );
};
