import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SearchInput } from "../components/searchInput/SearchInput";
import classes from "./childRoute.module.css";

export const ChildRootLayout = () => {
  const navigate = useNavigate();
  const placeholder = "Search..."
  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <div className={classes.container}>
    <div className={classes.container__box}>
      <button className={classes.container__btn} onClick={handleNavigateBack}></button>
      <div className={classes.container__search}>
        <SearchInput placeholder={placeholder}/>
      </div>
    </div>
    <Outlet />
  </div>
  );
};
