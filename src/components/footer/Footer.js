import React from "react";
import home from "../../assets/home.svg";
import homeActive from "../../assets/home_active.svg";
import categoryActive from "../../assets/category_active.svg";
import helpActive from "../../assets/help_active.svg";
import cartActive from "../../assets/cart_active.svg";
import profileActive from "../../assets/profile_active.svg";
import category from "../../assets/grid.svg";
import help from "../../assets/alert-circle.svg";
import cart from "../../assets/shopping-cart.svg";
import profile from "../../assets/user.svg";
import classes from "./footer.module.css";
import { NavLink } from "react-router-dom";

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
    path: "/category",
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
    path: "profileInfo",
  },
];

export const Footer = () => {
  return (
    <div className={classes.container}>
      {footerData.map((data) => (
        <NavLink
          key={data.text}
          to={data.path}
          className={classes.container__box}
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
