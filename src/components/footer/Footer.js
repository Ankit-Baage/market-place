import React from "react";
import home from "../../assets/home.svg";
import category from "../../assets/grid.svg";
import help from "../../assets/alert-circle.svg";
import cart from "../../assets/shopping-cart.svg";
import profile from "../../assets/user.svg";
import classes from "./footer.module.css";

const footerData = [
  {
    image: home,
    text: "Home",
  },

  {
    image: category,
    text: "Category",
  },
  {
    image: help,
    text: "Help",
  },
  {
    image: cart,
    text: "Cart",
  },
  {
    image: profile,
    text: "Profile",
  },
];

export const Footer = () => {
  return (
    <div className={classes.container}>
      {footerData.map((data) => (
        <div key={data.text} className={classes.container__box}>
          <img
            src={data.image}
            alt="data.text"
            className={classes.container__box__img}
          />
          <h1 className={classes.container__box__text}>{data.text}</h1>
        </div>
      ))}
    </div>
  );
};
