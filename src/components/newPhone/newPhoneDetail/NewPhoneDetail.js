import React, { useCallback, useEffect, useState } from "react";
import { ProductCarousel } from "../../ui/productCarousel/ProductCarousel";
import classes from "./newPhoneDetail.module.css";

import { NewPhonePrice, SparePrice } from "../newPhonePrice/NewPhonePrice";
import { SpareHighlights } from "../newPhoneHighlights/NewPhoneHighlights";
import { SpareOffers } from "../newPhoneOffers/NewPhoneOffers";
import { validateImages } from "../../../utils/helpers/imageValidator";
import dummy from "../../../assets/spare_preview_not_available.svg";
import { NewPhoneColors } from "../newPhoneColor/NewPhoneColors";
import { NewPhoneVariant } from "../newPhoneVariant/NewPhoneVariant";

const dummyArray = [dummy];

export const NewPhoneDetail = ({
  images,
  prices,
  colors,
  descriptions,
  color,
  infoSpecs,
  onColorSelect,
  variant,
  variants,
  variantId,
  onVariantSelect,
  onAddToCart,
  cart_status,
  wishlist_status,
  onWishList,
}) => {
  const [validationResults, setValidationResults] = useState({});

  // Function to check if an image URL is valid
  const checkImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true); // Image loaded successfully
      img.onerror = () => resolve(false); // Error loading image
      img.src = url;
    });
  };

  // Function to validate all image URLs
  const validateImages = useCallback(async (images) => {
    const results = {};
    for (const url of images) {
      results[url.image_url] = await checkImageUrl(url.image_url);
    }
    setValidationResults(results);
  }, []);

  useEffect(() => {
    validateImages(images);
  }, [images, validateImages]);

  const imageArray = Object.keys(validationResults).filter(
    (key) => validationResults[key] === true
  );

  return (
    <div className={classes.box}>
      <div className={classes.box__spareIntro}>
        <span
          className={
            wishlist_status === 1
              ? classes.box__info__fav__active
              : classes.box__info__fav
          }
          onClick={onWishList}
        />
        <ProductCarousel
          imageData={imageArray.length < 1 ? dummyArray : imageArray}
        />
        <div className={classes.box__spareName}>
          <h1
            className={classes.box__spareName__title}
          >{`${infoSpecs.model} ${infoSpecs.ram}/${infoSpecs.rom} (${color})`}</h1>
          <h2 className={classes.box__spareName__subtitle}>New</h2>
          <hr className={classes.box__item__divider} />
        </div>
      </div>
      <NewPhoneVariant
        variants={variants}
        variant={variant}
        variantId={variantId}
        onVariantSelect={(itemId) => onVariantSelect(itemId)}
      />
      <NewPhoneColors
        colors={colors}
        color={color}
        onColorSelect={onColorSelect}
      />
      <NewPhonePrice prices={prices} />
      <SpareHighlights highlights={descriptions} />
      <SpareOffers />
      <div className={classes.box__otherSellers}>
        <div className={classes.box__otherSellers__container}>
          <div className={classes.box__otherSellers__info}>
            <h2 className={classes.box__otherSellers__info__title}>
              Other Sellers on MobiGarage{" "}
            </h2>
            <h3 className={classes.box__otherSellers__info__subtitle}>
              Starting from
            </h3>
            <h4 className={classes.box__otherSellers__info__price}>
              Rs.45,250
            </h4>
          </div>
          <span className={classes.box__otherSellers__arrow} />
        </div>
        <hr className={classes.box__item__divider} />
      </div>
      <div className={classes.box__btns}>
        <button
          className={`${classes.box__btns__btn} ${classes.box__btns__add}`}
          onClick={onAddToCart}
        >
          {cart_status ? "Added To cart" : "Add To cart"}
        </button>
        <button
          className={`${classes.box__btns__btn} ${classes.box__btns__buy}`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};
