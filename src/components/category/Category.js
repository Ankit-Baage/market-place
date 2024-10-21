import React from "react";
import category_vrp from "../../assets/category_vrp.svg";
import category_prexo from "../../assets/category_prexo.svg";
import category_spares from "../../assets/category_spares.svg";
import category_newPhones from "../../assets/category_newPhones.svg";
import classes from "./category.module.css";

export const Category = () => {
  return (
    <div className={classes.box}>
      <h1 className={classes.box__title}>Product Category</h1>
      <div className={classes.box__vrp}>
        <div className={classes.box__vrp__content}>
          <h2 className={classes.box__vrp__content__title}>VRP</h2>
          <p className={classes.box__vrp__content__para}>
            Lorium was an ancient village of ancient Etruria, Italy, on the Via
            Aurelia,
          </p>
        </div>
        <img className={classes.box__vrp__img} src={category_vrp} alt="vrp" />
      </div>
      <div className={classes.box__others}>
        <div className={classes.box__others__prexo}>
          <h2 className={classes.box__others__prexo__title}>Prexo</h2>
          <img
            className={classes.box__others__prexo__img}
            src={category_prexo}
            alt="prexo"
          />
        </div>
        <div className={classes.box__others__spares}>
          <h2 className={classes.box__others__spares__title}>Spares</h2>
          <img
            className={classes.box__others__spares__img}
            src={category_spares}
            alt="newPhones"
          />
        </div>
      </div>
      <div className={classes.box__newPhones}>
        <div className={classes.box__newPhones__content}>
          <h2 className={classes.box__newPhones__content__title}>New Phones</h2>
          <p className={classes.box__newPhones__content__para}>
            Lorium was an ancient village of ancient Etruria, Italy, on the Via
            Aurelia,
          </p>
        </div>
        <img
          className={classes.box__newPhones__img}
          src={category_newPhones}
          alt="vrp"
        />
      </div>
    </div>
  );
};
