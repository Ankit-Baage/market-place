import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const { data, isSuccess, isLoading } = useGetCartList(coupon.id);
  const navigate = useNavigate();

  const [localQuantities, setLocalQuantities] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation();
  const { mutate: updateQuantity } = useCartListQuantityMutation();
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

      setIsUpdating(true);

      try {
        const response = await deleteItem(data);
        toast.success(response.message.displayMessage);
        console.log(response.message.displayMessage);
      } catch (error) {
        toast.error(error.response.data.message.displayMessage);
      } finally {
        setIsUpdating(false);
      }
    },
    [deleteItem] // Dependencies for useCallback
  );

  const handleQuantityUpdate = useCallback(
    (operator, item) => {
      let currentQuantity = localQuantities[item.id] || item.quantity;

      // Check for decrement case and prevent going below 1
      if (operator === "decrease" && currentQuantity === 1) {
        toast.warn("Quantity cannot be less than 1");
        return;
      }

      const data = {
        operator,
        category_id: item.category_id,
        master_product_id: item.master_product_id,
      };

      // Set the loader for the API call
      setIsUpdating(true);

      // Make the API call to update the quantity
      updateQuantity(data, {
        onSuccess: (response) => {
          // Based on the operator, adjust the local quantity only on success
          const newQuantity =
            operator === "increase" ? currentQuantity + 1 : currentQuantity - 1;

          setLocalQuantities((prev) => ({
            ...prev,
            [item.id]: newQuantity, // Update local state with the new quantity
          }));

          toast.success(response.message.displayMessage);
        },
        onError: (error) => {
          toast.error(error.response.data.message.displayMessage);
        },
        onSettled: () => {
          // Clear the updating state once the API call finishes
          setIsUpdating(false);
        },
      });
    },
    [localQuantities, updateQuantity]
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
    navigate("coupons");
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
                isUpdating={isUpdating}
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
                onUpdateQuantity={(operator) =>
                  handleQuantityUpdate(operator, item)
                }
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
                spareQuantity={localQuantities[item.id] || item.quantity}
                isUpdating={isUpdating}
              />
            );
          case 7:
            return (
              <NewPhoneCartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(operator) =>
                  handleQuantityUpdate(operator, item)
                }
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
                newPhoneQuantity={localQuantities[item.id] || item.quantity}
                isUpdating={isUpdating}
              />
            );
          case 8:
            return (
              <OpenBoxCartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(operator) =>
                  handleQuantityUpdate(operator, item)
                }
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
                openBoxQuantity={localQuantities[item.id] || item.quantity}
                isUpdating={isUpdating}
              />
            );
          default:
            return null;
        }
      });
    }
    return <EmptyCart />;
  }, [
    isLoading,
    isSuccess,
    data?.data?.data,
    isUpdating,
    localQuantities,
    handleSaveForLater,
    handleRemove,
    handleQuantityUpdate,
  ]);
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
  }, [coupon.id, dispatch, searchParams]);

  useEffect(() => {
    if (isSuccess && data) {
      const couponCode = data?.data?.data?.applied_coupon_code;
      if (couponCode) {
        setSearchParams((params) => {
          params.set("coupon", coupon.id);
          return params;
        });
      } else {
        dispatch(couponRemoved());
      }
    } else {
      setSearchParams((params) => {
        params.delete("coupon");
        return params;
      });
    }
  }, [coupon, data, data?.data?.data?.applied_coupon_code, dispatch, isSuccess, setSearchParams]);

  console.log(data?.data?.data);
  console.log("coupon :", coupon);
  return isSuccess ? (
    <div className={classes.box}>
      <SearchBar placeholder={placeholder} />
      <div className={classes.box__cart}>{content}</div>
      <div className={classes.box__cart}>
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
        />
        <button className={classes.box__cart__order__btn}>Place Order</button>
      </div>
    </div>
  ) : (
    <CartLoader />
  );
};
