import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { couponAdded, selectCouponState } from "../../store/coupon/couponSlice";
import { selectAddressState } from "../../store/address/addressSlice";
import { useSearchParams } from "react-router-dom";

export const ReviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const coupon = useSelector(selectCouponState);
  const address = useSelector(selectAddressState);
  const dispatch = useDispatch();
  console.log("coupon :", coupon);
  console.log("address :", address);
 
  return (
    <div>
      <h1>ReviewPage</h1>
      {/* <h2>{coupon.id}</h2>
      <h2>{address.id}</h2> */}
    </div>
  );
};
