import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCouponState } from "../../store/coupon/couponSlice";
import { selectAddressState } from "../../store/address/addressSlice";
import { useSearchParams } from "react-router-dom";
import classes from "./reviewPage.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import useGetCartList from "../../tanstack-query/cartList/useGetCartList";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";

import { EmptyCart } from "../../components/cart/EmptyCart";
import { OrderSummary } from "../../components/orderSummary/OrderSummary";
import { VrpReviewItem } from "../../components/review/vrpReviewItem/VrpReviewItem";
import { SparesReviewItem } from "../../components/review/sparesReviewItem/SparesReviewItem";
import { OpenBoxReviewItem } from "../../components/review/openBoxReviewItem/OpenBoxReviewItem";
import { NewPhoneReviewItem } from "../../components/review/newPhoneReviewItem/NewPhoneReviewItem";
import { AddressReview } from "../../components/review/addressreview/AddressReview";

export const ReviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const coupon = useSelector(selectCouponState);
  const address = useSelector(selectAddressState);
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading } = useGetCartList(coupon.id);
  console.log("coupon :", coupon);
  console.log("address :", address);
  const placeholder = "Search...";

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

  return (
    <div className={classes.box}>
      <SearchBar placeholder={placeholder} />
      <AddressReview address={data?.data?.data?.address} />
      <div className={classes.box__cart}>{content}</div>
      <div className={classes.box__cart}>
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

          <button className={classes.box__coupons__remove}>Remove</button>
        </div>

        <OrderSummary
          subTotal={data?.data?.data.total_amount}
          gst={data?.data?.data?.gst_amount}
          grandTotal={data?.data?.data?.final_amount}
          couponAmount={data?.data?.data?.applied_coupon_amount}
          couponCode={data?.data?.data?.applied_coupon_code}
        />
        <button className={classes.box__cart__order__btn}>
          Select Address
        </button>
      </div>
    </div>
  );
};
