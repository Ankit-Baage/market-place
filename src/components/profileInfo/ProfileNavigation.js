import React from "react";
import profileNavigator from "../../assets/profileNavigator.png";
import laterNavigator from "../../assets/laterNavigator.png";
import cartNavigator from "../../assets/cartNavigator.png";
import wishListNavigator from "../../assets/wishListNavigator.png";
import aboutNavigator from "../../assets/aboutNavigator.png";
import faqNavigator from "../../assets/faqNavigator.png";
import termNavigator from "../../assets/termNavigator.png";
import policyNavigator from "../../assets/policyNavigator.png";
import addressNavigator from "../../assets/addressNavigator.png";
import grievanceNavigator from "../../assets/grievanceNavigator.png";

import { LinkItem } from "../linkItem/LinkItem";

import classes from "./profileNavigation.module.css";
import { useNavigate } from "react-router-dom";

const navigators = [
  {
    id: 1,
    title: "My Profile",
    subTitle: "Your account info",
    image: profileNavigator,
    path: "profile",
  },

  {
    id: 2,
    title: "My Orders",
    subTitle: "View order history",
    image: cartNavigator,
    path: "orders",
  },
  {
    id: 3,
    title: "My Address",
    subTitle: "Edit saved addresses",
    image: addressNavigator,
    path: "address",
  },
  {
    id: 4,
    title: "Save for Later",
    subTitle: "Visit saved items",
    image: laterNavigator,
    path: "later",
  },
  {
    id: 5,
    title: "My Wishlist",
    subTitle: "Saved favorite items",
    image: wishListNavigator,
    path: "wishlist",
    backGround: "#27BEFC",
  },
];

const extendedNavigators = [
  {
    id: 1,
    title: "About Us",
    subTitle: "know about us",
    image: aboutNavigator,
    path: "aboutUs",
  },

  {
    id: 2,
    title: "FAQs",
    subTitle: "Commonly asked questions",
    image: faqNavigator,
    path: "faq",
  },
  {
    id: 3,
    title: "Terms of Use",
    subTitle: "Usage guidelines",
    image: termNavigator,
    path: "term",
  },

  {
    id: 4,
    title: "Privacy Policy",
    subTitle: "Data protection details",
    image: policyNavigator,
    path: "policy",
  },
  {
    id: 5,
    title: "Grievance Officer",
    subTitle: "Contact for complaints",
    image: grievanceNavigator,
    path: "grievance",
  },
];

export const ProfileNavigation = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };
  return (
    <div className={classes.box__wrapper}>
      <div className={classes.box}>
        <div className={classes.box__profile}>
          <div className={classes.box__profile__info}>
            <button className={classes.box__profile__back} onClick={handleNavigate}/>
            <div className={classes.box__profile__user}>
              <span className={classes.box__profile__info__avatar}></span>
              <h2 className={classes.box__profile__info__name}>
                Shubham Srivastav
              </h2>
            </div>
          </div>
        </div>
        <div className={classes.box__links}>
          <div className={classes.box__links__container}>
            {navigators.map((navigator) => (
              <LinkItem key={navigator.id} navigator={navigator} />
            ))}
          </div>
          <h3 className={classes.box__links__new}>Other Details</h3>
          <div className={classes.box__links__container}>
            {extendedNavigators.map((navigator) => (
              <LinkItem key={navigator.id} navigator={navigator} />
            ))}
          </div>
        </div>
      </div>
      <button className={classes.box__btn}>
        <span className={classes.box__btn__img} />
        Logout
      </button>
    </div>
  );
};
