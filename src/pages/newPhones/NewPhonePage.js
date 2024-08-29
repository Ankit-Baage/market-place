import React from "react";
import classes from "./newPhones.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { Outlet } from "react-router-dom";

export const NewPhonePage = () => {
  const placeholder = "Search for new phones...";
  return (
    <div className={classes.container}>
      <SearchBar placeholder={placeholder} />
      <Outlet />
    </div>
  );
};
