import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import classes from "./rootLayout.module.css";
import { Footer } from "../components/footer/Footer";
import { generateId } from "../utils/helpers/getAuth";

export const RootLayout = () => {
  useEffect(() => {
    const guestId = Cookies.get("guestId");
    if (!guestId) {
      generateId();
    }
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
