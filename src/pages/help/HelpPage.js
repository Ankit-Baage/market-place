import React from "react";
import classes from "./helpPage.module.css";
import { Help } from "../../components/help/Help";
import { Header } from "../../components/header/Header";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";

export const HelpPage = () => {
  const placeholder = "Search for mobile, accessories & more";
  return (
    <div className={classes.container}>
      <div className={classes.container__box}>
        <Header />

        <div className={classes.container__search}>
          <SearchBar placeholder={placeholder} />
        </div>
      </div>
      <Help />
    </div>
  );
};
