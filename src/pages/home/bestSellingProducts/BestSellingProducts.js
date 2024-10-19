import React, { useEffect } from "react";
import { BestSellingProduct } from "../../../components/bestSellingProduct/BestSellingProduct";
import phone1 from "../../../assets/phone1.svg";
import phone2 from "../../../assets/phone3.svg";
import phone3 from "../../../assets/phone3.svg";
import phone4 from "../../../assets/phone4.svg";
import classes from "./bestSellingProducts.module.css";

export const data = [
  { id: 1, name: "Xiaomi 11 Lite NEW....", image: phone1, price: "13,800" },
  { id: 2, name: "Xiaomi 11 Lite NEW....", image: phone2, price: "13,800" },
  { id: 3, name: "Xiaomi 11 Lite NEW....", image: phone3, price: "13,800" },
  { id: 4, name: "Xiaomi 11 Lite NEW....", image: phone4, price: "13,800" },
];

export const BestSellingProducts = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <h1 className={classes.box__head__title}>Best Selling (Prexo)</h1>
        <button className={classes.box__btn}></button>
      </div>
      <div className={classes.box__productList}>
        {data.map((productData) => (
          <BestSellingProduct productData={productData} key={productData.id} />
        ))}
      </div>
    </div>
  );
};
