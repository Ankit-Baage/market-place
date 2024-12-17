import React from "react";
import category_vrp from "../../assets/category_vrp.png";
import category_spares from "../../assets/category_spares.png";
import category_newPhones from "../../assets/Category_newPhones.png";
import category_openBox from "../../assets/category__openBox.png";
import classes from "./category.module.css";
import { Link } from "react-router-dom";

export const Category = () => {
  return (
    <div className={classes.box}>
      <h1 className={classes.box__title}>Product Category</h1>
      {/* <Link className={classes.box__vrp} to="/vrp">
        <div className={classes.box__vrp__content}>
          <h2 className={classes.box__vrp__content__title}>VRP</h2>
          <p className={classes.box__vrp__content__para}>
            High-quality products under various quality grades to meet your
            specific needs.
          </p>
        </div>
        <img className={classes.box__vrp__img} src={category_vrp} alt="/vrp" />
      </Link> */}
      <div className={classes.box__others}>
        {/* <Link className={classes.box__others__prexo} to="/openBox">
          <h2 className={classes.box__others__prexo__title}>Open Box</h2>
          <img
            className={classes.box__others__prexo__img}
            src={category_openBox}
            alt="Open Box"
          />
        </Link> */}
        <Link className={classes.box__others__spares} to="/spares">
          <h2 className={classes.box__others__spares__title}>Spares</h2>
          <img
            className={classes.box__others__spares__img}
            src={category_spares}
            alt="spares"
          />
        </Link>
      </div>
      {/* <Link className={classes.box__newPhones} to="/newPhone">
        <div className={classes.box__newPhones__content}>
          <h2 className={classes.box__newPhones__content__title}>New Phones</h2>
          <p className={classes.box__newPhones__content__para}>
            Seal-packed, brand-new phones with latest technology and untouched
            quality.
          </p>
        </div>
        <img
          className={classes.box__newPhones__img}
          src={category_newPhones}
          alt="newPhones"
        />
      </Link> */}
    </div>
  );
};
