import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./address.module.css";

export const Address = ({
  address,
  selectedAddressId,
  onAddressChange,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={classes.box__card}>
      <label
        htmlFor={`address-${address.id}`}
        className={classes.box__content__filter__option}
      >
        <input
          id={`address-${address.id}`}
          type="radio"
          className={classes.box__content__filter__option__input}
          checked={selectedAddressId === address.id}
          onChange={() => onAddressChange(address.id)}
        />
        <span className={`${classes.box__content__filter__labelText} `}>
          {address.name}
        </span>{" "}
        <span className={classes.box__content__filter__option__label}></span>
      </label>

      <div className={classes.box__card__info}>
        <p className={classes.box__card__address}>
          {address.address_line1}, {address.address_line2}, {address.city},{" "}
          {address.state}, {address.postal_code}, {address.country}
        </p>
        <p className={classes.box__card__address}>
          Phone Number: {address.mobile_no}
        </p>
      </div>
      <div className={classes.box__card__confirm}>
        {/* <button className={classes.box__card__confirm__btn}>
          Delivery to this address
        </button> */}
        <button className={classes.box__card__navigate} onClick={onEdit}>
          Edit Address
        </button>
        <button className={classes.box__card__navigate} onClick={onDelete}>
          Delete Address
        </button>
      </div>
    </div>
  );
};
