import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./profileStatic.module.css";
import { Header } from "../../components/header/Header";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";

export const ProfileStaticOutlet = () => {
  const placeHolder = "Search..."
  return (
    <div className={classes.box}>
      <Header />
      <SearchBar placeholder={placeHolder}/>
      <Outlet />
    </div>
  );
};
