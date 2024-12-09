import React, { useMemo } from "react";
import {  useParams } from "react-router-dom";
import { helpPages } from "../../../webStaticData/helpPages";
import Dropdown from "../../dropDown/DropDown";
import classes from "./helpCategory.module.css";


export const HelpCategory = () => {
  const { helpCategory: categoryParams } = useParams();
  const pageData = useMemo(
    () => helpPages.find((el) => el.page === categoryParams),
    [categoryParams]
  );

  return pageData ? (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={pageData.image}
            alt="help account"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>{pageData.name}</h1>
        </div>
        <p className={classes.box__head__para}>{pageData.description}</p>
      </div>
      <div className={classes.box__container}>
        {pageData.dropdowns.map((dropdown) => (
          <Dropdown
            key={dropdown.id}
            id={dropdown.id}
            title={dropdown.title}
            options={dropdown.options}
          />
        ))}
      </div>
    </div>
  ) : null;
};
