import React, { useCallback, useEffect, useState } from "react";
import { ProductCarousel } from "../../ui/productCarousel/ProductCarousel";
import classes from "./spareDetail.module.css";
import { SpareColors } from "../spareColor/SpareColors";
import { SparePrice } from "../sparePrice/SparePrice";
import { SpareHighlights } from "../spareHighlights/SpareHighlights";
import { SpareOffers } from "../spareOffers/SpareOffers";
import { validateImages } from "../../../utils/helpers/imageValidator";
import dummy from "../../../assets/spare_preview_not_available.svg";

const dummyArray = [dummy];

export const SpareDetail = ({
  images,
  prices,
  colors,
  descriptions,
  color,
  spareData,
  partName,
  onColorSelect,
}) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [validationResults, setValidationResults] = useState({});

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    console.log("Selected color:", color);
  };

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
      console.log("url:", url.image_url);
      results[url.image_url] = await checkImageUrl(url.image_url);
    }
    setValidationResults(results);
  }, []);

  useEffect(() => {
    validateImages(images);
  }, [images, validateImages]);

  console.log(validationResults);

  const imageArray = Object.keys(validationResults).filter(
    (key) => validationResults[key] === true
  );
  console.log(imageArray);

  return (
    <div className={classes.box}>
      <div className={classes.box__spareIntro}>
        <ProductCarousel
          imageData={imageArray.length < 1 ? dummyArray : imageArray}
        />
        <div className={classes.box__spareName}>
          <h1 className={classes.box__spareName__title}>{partName}</h1>
          <h2 className={classes.box__spareName__subtitle}>New</h2>
          <hr className={classes.box__item__divider} />
        </div>
      </div>
      <SpareColors
        colors={colors}
        color={color}
        onColorSelect={onColorSelect}
      />
      <SparePrice prices={prices} />
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
        >
          Add to Cart
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
