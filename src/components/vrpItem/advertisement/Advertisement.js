import React, { useEffect } from "react";
import classes from "./advertisement.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdvertisementParams,
  selectAdvertisementParams,
} from "../../../store/advertisementParams/advertisementParamsSlice";

export const Advertisement = ({ image }) => {
  const dispatch = useDispatch();
  const advertisementParams = useSelector(selectAdvertisementParams);

  const handleSetParams = () => {
    dispatch(
      getAdvertisementParams({
        navigate_to_page: image[0].navigate_to_page,
        params: image[0].params,
      })
    );
  };

  // console.log(image[0].params);

  // console.log(advertisementParams);
  // useEffect(() => {
  //   if (image[0]?.navigate_to_page && image[0]?.params) {
  //     dispatch(getAdvertisementParams(image[0].params));
  //   }
  // }, [dispatch, image]);

  return (
    <Link className={classes.box} to="spares" onClick={handleSetParams}>
      <img
        src={image[0].url}
        alt="advertisement"
        className={classes.box__img}
      />
    </Link>
  );
};
