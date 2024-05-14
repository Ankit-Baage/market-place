import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./home.module.css";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { SearchInput } from "../../components/searchInput/SearchInput";

export const Home = () => {
  console.log("home");

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
