import React from "react";
import classes from "./openBox.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { Outlet } from "react-router-dom";

export const OpenBoxPage = () => {
  const placeholder = "Search for open Box ...";
  return (
    <div className={classes.container}>
      <SearchBar placeholder={placeholder} />
      <Outlet />
    </div>
  );
};
