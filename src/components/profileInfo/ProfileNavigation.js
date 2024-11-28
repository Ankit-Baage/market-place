import React from "react";
import Cookies from "js-cookie";
import profileNavigator from "../../assets/profileNavigator.svg";
import laterNavigator from "../../assets/laterNavigator.svg";
import cartNavigator from "../../assets/cartNavigator.svg";
import wishListNavigator from "../../assets/wishListNavigator.svg";
import aboutNavigator from "../../assets/aboutNavigator.svg";
import faqNavigator from "../../assets/faqNavigator.svg";
import termNavigator from "../../assets/termNavigator.svg";
import policyNavigator from "../../assets/policyNavigator.svg";
import addressNavigator from "../../assets/addressNavigator.svg";
import grievanceNavigator from "../../assets/grievanceNavigator.svg";

import { LinkItem } from "../linkItem/LinkItem";

import classes from "./profileNavigation.module.css";
import { useNavigate } from "react-router-dom";
import useGetUserProfile from "../../tanstack-query/userProfile/useGetUserProfile";
import { getFirstLetter } from "../../utils/helpers/getFirstLetter";
import { HeartBeat } from "../skeletons/heartBeat/HeartBeat";

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
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");
  const user_id = authToken ? userId : guestId;

  const { data, isError, isSuccess, } =
    useGetUserProfile(user_id);

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleLogOut = () => {
    if (authToken) {
      // Remove session-related cookies
      Cookies.remove("authToken");
      Cookies.remove("user_id");
      // Redirect to home after logging out
      navigate("/");
    } else {
      // Redirect to login page
      navigate("/authentication");
    }
  };

  console.log(data);
  return (
    <div className={classes.box__wrapper}>
      <div className={classes.box}>
        <div className={classes.box__profile}>
          <div className={classes.box__profile__info}>
            <button
              className={classes.box__profile__back}
              onClick={handleNavigate}
            />
            {isSuccess ? (
              <div className={classes.box__profile__user}>
                <span className={classes.box__profile__info__avatar}>
                  {getFirstLetter(data?.data?.data?.name)}
                </span>
                <h2 className={classes.box__profile__info__name}>
                  {data?.data?.data?.name}
                </h2>
              </div>
            ) : (
              <HeartBeat />
            )}
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

      <button className={classes.box__btn} onClick={handleLogOut}>
        <span className={classes.box__btn__img} />
        {authToken ? "Log Out" : "Log In"}
      </button>
    </div>
  );
};
