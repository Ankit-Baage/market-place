import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { couponAdded, selectCouponState } from "../../store/coupon/couponSlice";
import {
  selectAddressState,
  setAddressId,
} from "../../store/address/addressSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./reviewPage.module.css";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";

import { EmptyCart } from "../../components/cart/EmptyCart";
import { OrderSummary } from "../../components/orderSummary/OrderSummary";
import { VrpReviewItem } from "../../components/review/vrpReviewItem/VrpReviewItem";
import { SparesReviewItem } from "../../components/review/sparesReviewItem/SparesReviewItem";
import { OpenBoxReviewItem } from "../../components/review/openBoxReviewItem/OpenBoxReviewItem";
import { NewPhoneReviewItem } from "../../components/review/newPhoneReviewItem/NewPhoneReviewItem";
// import { AddressReview } from "../../components/review/addressReview/AddressReview";
import useGetReviewList from "../../tanstack-query/reviewList/useGetReviewList";
import usePlaceOrderMutation from "../../tanstack-query/placeOrder/usePlaceOrderMutation";

export const ReviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const coupon = useSelector(selectCouponState);
  const address = useSelector(selectAddressState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isSuccess, isLoading } = useGetReviewList({
    coupon_code: coupon.id,
    address_id: address.id,
  });
  const {
    mutate,
    isLoading: orderPosting,
    isError: orderError,
    isSuccess: orderSuccess,
    // error,
  } = usePlaceOrderMutation();

  // const placeholder = "Search...";
  const handlePlaceOrder = () => {
    mutate(
      { coupon_code: coupon.id, address_id: address.id },
      {
        onSuccess: (data) => {
          console.log("Order placed successfully:", data);
          navigate("/success");
        },
        onError: (error) => {
          console.error("Failed to place order:", error);
          navigate("/cart");
        },
      }
    );
  };

  const content = useMemo(() => {
    if (isLoading) {
      return <CartLoader />;
    }
    if (isSuccess && data?.data?.data?.cart_items.length > 0) {
      return data.data.data.cart_items.map((item) => {
        switch (item.category_id) {
          case 5:
            return <VrpReviewItem key={item.request_id} item={item} />;
          case 6:
            return <SparesReviewItem key={item.id} item={item} />;
          case 7:
            return <NewPhoneReviewItem key={item.id} item={item} />;
          case 8:
            return <OpenBoxReviewItem key={item.id} item={item} />;
          default:
            return null;
        }
      });
    }
    return <EmptyCart />;
  }, [data?.data?.data?.cart_items, isLoading, isSuccess]);

  useEffect(() => {
    const couponIdFromUrl = searchParams.get("coupon");
    const addressIdFromUrl = searchParams.get("address");

    // Set Redux state only if URL params are present
    if (couponIdFromUrl) {
      dispatch(couponAdded({ id: couponIdFromUrl }));
    }
    if (addressIdFromUrl) {
      dispatch(setAddressId({ id: addressIdFromUrl }));
    }
  }, [dispatch, searchParams]);

  // Sync Redux state with URL parameters whenever Redux state changes
  useEffect(() => {
    setSearchParams((params) => {
      if (coupon.id) {
        params.set("coupon", coupon.id);
      } else {
        params.delete("coupon");
      }

      if (address.id) {
        params.set("address", address.id);
      } else {
        params.delete("address");
      }
      return params;
    });
  }, [coupon.id, address.id, setSearchParams]);

  console.log("coupon :", coupon.id);
  console.log("address :", address.id);
  const handleNavigate = () => {
    navigate("/cart");
  };

  return (
    <div className={classes.box}>
      {/* <SearchBar placeholder={placeholder} /> */}
      <button className={classes.box__btn} onClick={handleNavigate} />
      {data?.data?.data?.address && (
        <div className={classes.box__address}>
          <h2 className={classes.box__address__title}>Selected address</h2>
          {/* <AddressReview address={data?.data?.data?.address} /> */}
        </div>
      )}
      <div className={classes.box__cart}>{content}</div>
      <div className={classes.box__cart}>
        <h3 className={classes.box__cart__order}>Order Summary</h3>
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
          </div>
        )}

        <OrderSummary
          subTotal={data?.data?.data.total_amount}
          originalAmount={data?.data?.data?.original_amount}
          gst={data?.data?.data?.gst_amount}
          grandTotal={data?.data?.data?.final_amount}
          couponAmount={data?.data?.data?.applied_coupon_amount}
          couponCode={data?.data?.data?.applied_coupon_code}
        />
        <button
          className={classes.box__cart__order__btn}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
