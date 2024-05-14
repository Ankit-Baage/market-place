import React from "react";
import classes from "./searchBar.module.css";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "../../searchInput/SearchInput";

export const SearchBar = ({ placeholder }) => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className={classes.box}>
      <button className={classes.box__btn} onClick={handleNavigateBack} />
      <div className={classes.box__search}>
        <SearchInput placeholder={placeholder} />
      </div>
    </div>
  );
};
