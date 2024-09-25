import React from "react";
import { NavLink } from "react-router-dom";
import home from "../../assets/home.svg";
import homeActive from "../../assets/homeActive.svg";
import categoryActive from "../../assets/categoryActive.svg";
import helpActive from "../../assets/helpActive.svg";
import cartActive from "../../assets/cartActive.svg";
import profileActive from "../../assets/profileActive.svg";
import category from "../../assets/grid.svg";
import help from "../../assets/help.svg";
import cart from "../../assets/cart.svg";
import profile from "../../assets/profile.svg";
import classes from "./footer.module.css";

const footerData = [
  {
    image: home,
    activeImage: homeActive,
    text: "Home",
    path: "/home",
  },
  {
    image: category,
    activeImage: categoryActive,
    text: "Category",
    path: "category",
  },
  {
    image: help,
    activeImage: helpActive,
    text: "Help",
    path: "/help",
  },
  {
    image: cart,
    activeImage: cartActive,
    text: "Cart",
    path: "cart",
  },
  {
    image: profile,
    activeImage: profileActive,
    text: "Profile",
    path: "profile",
  },
];

export const Footer = () => {
  return (
    <div className={classes.container}>
      {footerData.map((data) => (
        <NavLink
          key={data.text}
          to={data.path}
          className={({ isActive }) =>
            `${classes.container__box} ${isActive ? classes.active : ""}`
          }
          end
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? data.activeImage : data.image}
                alt={data.text}
                className={classes.container__box__img}
              />
              <h1
                className={`${classes.container__box__text} ${
                  isActive ? classes.categoryActive : ""
                }`}
              >
                {data.text}
              </h1>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};
