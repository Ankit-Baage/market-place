import React from "react";
import { useLocation, useNavigate, useRouteError } from "react-router-dom";
import classes from "./error.module.css";
import { BrandIdentity } from "../brandIdentity/BrandIdentity";

export const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: '/' };
  console.log(error);
  let message = "Something went wrong!";
  // console.log(error)
  if (error.status === 404) {
    message = "Page Not found";
    console.log(message);
  }

  // const location = useLocation();
  // const { state } = location;
  // const { error } = state || {};


  const handleGoBack = () => {
    // Navigate back to the previous page
    console.log("Going back to:", from);
    navigate(-1);
    localStorage.removeItem("mobile_no");
  };

  return (
    <div className={classes.error}>
      <div className={classes.error__container}>
        <BrandIdentity />
        {error && (
          <p className={classes.error__message}>{message}</p>
        )}
        <button onClick={handleGoBack} className={classes.error__btn}>Go Back</button>
      </div>
    </div>
  );
};
