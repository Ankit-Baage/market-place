import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import classes from "./rootLayout.module.css";
import { Footer } from "../components/footer/Footer";
import {
  generateId,
  getAuthToken,
  getTokenDuration,
} from "../utils/helpers/getAuth";

export const RootLayout = () => {
  useEffect(() => {
    // Ensure guestId exists if authToken is absent
    generateId();

    const token = getAuthToken();

    if (!token || token === "EXPIRED") {
      Cookies.remove("authToken");
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log("tokenDuration", tokenDuration)

    // If the token duration is negative, remove authToken immediately
    if (tokenDuration <= 0) {
      Cookies.remove("authToken");
      return;
    }

    // Automatically remove the authToken when it expires
    const timeout = setTimeout(() => {
      console.log("Auth token expired! Removing...");
      Cookies.remove("authToken");
    }, tokenDuration);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.container__outlet}>
        <Outlet />
      </div>
      <div className={classes.container__footer}>
        <Footer />
      </div>
    </div>
  );
};
