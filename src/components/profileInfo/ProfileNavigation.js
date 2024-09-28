import React from "react";
import { Link } from "react-router-dom";
import profileNavigator from "../../assets/profileNavigator.svg";
import cartNavigator from "../../assets/cartNavigator.svg";
import wishListNavigator from "../../assets/wishListNavigator.svg";
import addressNavigator from "../../assets/addressNavigator.svg";

import { SearchBar } from "../ui/searchBarWithBackBtn/SearchBar";
import classes from "./profileNavigation.module.css";

const navigators = [
  {
    id: 1,
    name: "My Profile",
    image: profileNavigator,
    path: "profile",
    backGround: "#FF6F3F",
  },

  {
    id: 2,
    name: "My Orders",
    image: cartNavigator,
    path: "orders",
    backGround: "#2F3567",
  },
  {
    id: 3,
    name: "My Wishlist",
    image: wishListNavigator,
    path: "wishlist",
    backGround: "#27BEFC",
  },
  {
    id: 4,
    name: "My Address",
    image: addressNavigator,
    path: "address",
    backGround: "#F1BC19",
  },
];

export const ProfileNavigation = () => {
  const placeholder = "Search for mobile, accessories & more";
  return (
    <div className={classes.box}>
      <SearchBar placeholder={placeholder} />
      <div className={classes.box__linkGroup}>
        <div className={classes.box__linkGroup}>
          {navigators.map((navigator) => (
            <Link
              key={navigator.id}
              to={navigator.path}
              className={classes.box__link}
              style={{
                background: navigator.backGround,
              }}
            >
              <img
                src={navigator.image}
                alt={navigator.name}
                className={classes.box__link__image}
              />

              <h3 className={classes.box__link__title}>{navigator.name}</h3>
            </Link>
          ))}
        </div>
        <button className={classes.box__navigators__btn}>
          <span className={classes.box__navigators__btn__img} />
          Logout
        </button>
      </div>
    </div>
  );
};
