import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./vrpPage.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";

export const VrpPage = () => {
  const placeholder = "Enter VRP Number";
  return (
    <div className={classes.container}>
      <SearchBar placeholder={placeholder}/>
      <Outlet />
    </div>
  );
};
