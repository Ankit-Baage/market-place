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
import { NavLink, useLocation } from "react-router-dom";

const footerData = [
  {
    image: home,
    activeImage: homeActive,
    text: "Home",
    path: "/home",
    exact: true,
  },
  {
    image: category,
    activeImage: categoryActive,
    text: "Category",
    path: "category",
    exact: false,
  },
  {
    image: help,
    activeImage: helpActive,
    text: "Help",
    path: "help",
    exact: false,
  },
  {
    image: cart,
    activeImage: cartActive,
    text: "Cart",
    path: "cart",
    exact: false,
  },
  {
    image: profile,
    activeImage: profileActive,
    text: "Profile",
    path: "profileInfo",
    exact: false,
  },
];

export const Footer = () => {
  const location = useLocation(); // Access the current location

  return (
    <div className={classes.container}>
      {footerData.map((data) => (
        <NavLink
          key={data.text}
          to={data.path}
          className={classes.container__box}
          end={data.exact}
        >
          {({ isActive }) => {
            const isRouteActive = data.exact
              ? isActive
              : isActive || location.pathname.includes(data.path);

            return (
              <>
                <img
                  src={isRouteActive ? data.activeImage : data.image}
                  alt={data.text}
                  className={classes.container__box__img}
                />
                <h1
                  className={`${classes.container__box__text} ${
                    isRouteActive ? classes.categoryActive : ""
                  }`}
                >
                  {data.text}
                </h1>
              </>
            );
          }}
        </NavLink>
      ))}
    </div>
  );
};
