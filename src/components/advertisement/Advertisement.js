import React from "react";
import classes from "./advertisement.module.css";
import { useNavigate } from "react-router-dom";
import { handleNavigateFromAdvertisement } from "../../utils/helpers/getParamsFromAdd";

export const Advertisement = ({ image }) => {
  const navigate = useNavigate();

  return (
    <div
      className={classes.box}
      onClick={() => handleNavigateFromAdvertisement(image[0], navigate)}
    >
      <img
        src={image[0]?.url}
        alt="advertisement"
        className={classes.box__img}
      />
    </div>
  );
};
