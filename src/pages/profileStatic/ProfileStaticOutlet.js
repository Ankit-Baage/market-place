import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./profileStatic.module.css";
import { Header } from "../../components/header/Header";

export const ProfileStaticOutlet = () => {
  return (
    <div className={classes.box}>
      <Header />
      <Outlet />
    </div>
  );
};
