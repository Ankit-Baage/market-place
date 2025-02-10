import React from "react";

import classes from "./addressReview.module.css";

export const AddressReview = ({
  address,
  
}) => {
  console.log(address);
  return (
    <div className={classes.box__card}>
      <div className={classes.box__card__info}>
        <p className={classes.box__card__address}>
          {address?.address_line1}, {address?.address_line2}, {address?.city},{" "}
          {address?.state}, {address?.postal_code}, {address?.country}, {" "}
          {address.landmark}
        </p>
        <p className={classes.box__card__address}>
          Phone Number: {address?.mobile_no}
        </p>
      </div>
    </div>
  );
};
