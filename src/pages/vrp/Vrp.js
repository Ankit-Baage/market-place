import React from "react";
import classes from "./vrp.module.css";
import { SearchInput } from "../../components/searchInput/SearchInput";
import { Outlet, useNavigate } from "react-router-dom";

export const Vrp = () => {
  const navigate=useNavigate();
  const placeholder = "Enter VRP Number"

  const handleNavigateBack=()=>{
    navigate(-1)

  }
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
