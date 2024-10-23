import React from "react";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { Coupon } from "../../components/coupon/Coupon";
import coupon_page from "../../assets/couponPage_img.svg";
import classes from "./couponsPage.module.css";
import useGetCouponsList from "../../tanstack-query/couponsList/useGetCouponsList";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";

export const CouponsPage = () => {
  const placeholder = "Search for mobile, accessories & more";

  const { data, isLoading, isSuccess } = useGetCouponsList();

  console.log(data ? data.data.data : null);
  return (
    <div className={classes.box}>
      <SearchBar placeholder={placeholder} />
      <div className={classes.box__coupons}>
        <div className={classes.box__coupons__content}>
          <div className={classes.box__coupons__content__head}>
            <div className={classes.box__coupons__content__head__info}>
              <h1 className={classes.box__coupons__content__head__info__title}>
                Discount coupons
              </h1>
              <p className={classes.box__coupons__content__head__info__para}>
                Lorium was an ancient village of ancient Etruria, Italy, on the
                Via Aurelia,
              </p>
            </div>

            <img
              src={coupon_page}
              className={classes.box__coupons__content__head__img}
              alt="coupons"
            />
          </div>
          <div className={classes.box__coupons__search}>
            <label
              htmlFor="searchInput"
              className={classes.box__coupons__search__label}
            >
              <input
                id="searchInput"
                type="search"
                placeholder="Type coupon code here"
                className={classes.box__coupons__search__input}
              />
            </label>
            <button className={classes.box__coupons__search__btn}>Apply</button>
          </div>
        </div>
        <div className={classes.box__coupons__container}>
          <h3 className={classes.box__coupons__container__title}>
            Best coupon for you
          </h3>
          <div className={classes.box__coupons__list}>
            {isSuccess ? (
              data?.data?.data.map((coupon) => (
                <Coupon key={coupon.id} coupon={coupon} />
              ))
            ) : (
              <CartLoader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
