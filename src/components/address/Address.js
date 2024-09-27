import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./address.module.css";

export const Address = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <div className={classes.box}>
      <button className={classes.box__btn} onClick={handleNavigateBack} />
      <div className={classes.box__wrapper}>
        <h1 className={classes.box__wrapper__title}>
          Select a delivery address
        </h1>
        <div className={classes.box__card}>
          <label
            htmlFor="name"
            className={classes.box__content__filter__option}
          >
            <input
              id="name"
              type="radio"
              className={classes.box__content__filter__option__input}
              // checked={itemId === item.id.toString()}
              // onChange={() => handleCheckboxChange(item.id)}
            />
            <span className={`${classes.box__content__filter__labelText} `}>
              sachin
            </span>{" "}
            <span
              className={classes.box__content__filter__option__label}
            ></span>
          </label>

          <div className={classes.box__card__info}>
            <p className={classes.box__card__address}>
              Saderpur colony, Secc-44, Noida, Uttar Pradesh, 201301, India
            </p>
            <p className={classes.box__card__address}>
              Phone Number: 7838939694
            </p>
          </div>
          <div className={classes.box__card__confirm}>
            <button className={classes.box__card__confirm__btn}>
              Delivery to this address
            </button>
            <Link className={classes.box__card__navigate}>Edit Address</Link>
          </div>
        </div>
        <div className={classes.box__card}>
          <label
            htmlFor="name"
            className={classes.box__content__filter__option}
          >
            <input
              id="name"
              type="radio"
              className={classes.box__content__filter__option__input}
              // checked={itemId === item.id.toString()}
              // onChange={() => handleCheckboxChange(item.id)}
            />
            <span className={`${classes.box__content__filter__labelText} `}>
              sachin
            </span>{" "}
            <span
              className={classes.box__content__filter__option__label}
            ></span>
          </label>

          <div className={classes.box__card__info}>
            <p className={classes.box__card__address}>
              Saderpur colony, Secc-44, Noida, Uttar Pradesh, 201301, India
            </p>
            <p className={classes.box__card__address}>
              Phone Number: 7838939694
            </p>
          </div>
          <div className={classes.box__card__confirm}>
            <button className={classes.box__card__confirm__btn}>
              Delivery to this address
            </button>
            <button className={classes.box__card__navigate}>
              Edit Address
            </button>
          </div>
        </div>
        <div className={classes.box__card__new}>
          <button className={classes.box__card__new__btn}>
            Add a New Address <span className={classes.box__card__new__right} />
          </button>
          <button className={classes.box__card__new__btn}>
            Find a pickup location near you
            <span className={classes.box__card__new__right} />
          </button>
        </div>
      </div>
    </div>
  );
};
