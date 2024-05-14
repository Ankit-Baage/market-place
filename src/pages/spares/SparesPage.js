import React from "react";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { Outlet } from "react-router-dom";
import classes from "./sparePage.module.css";

export const SparesPage = () => {
  const placeholder = "Search for mobile, accessories & more";
  return (
    <div className={classes.container}>
      <SearchBar placeholder={placeholder} />
      <Outlet />
    </div>
  );
};
