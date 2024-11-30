import React from "react";
import termNavigator from "../../../assets/termNavigator.svg";
import Dropdown from "../../dropDown/DropDown";
import { Link } from "react-router-dom";
import classes from "./termsOfUse.module.css";

export const dropdowns = [
  {
    id: 1,
    title: "How do i login to my Mobigarage account?",
    options: [
      {
        id: "1_1",
        contents: [
          "You can log in to your Mobigarage account with these 3 simple steps:",
          <>
            Click on{" "}
            <Link to="/authentication" style={{ color: "#FF6F3F" }}>
              LOG IN/SIGN UP
            </Link>{" "}
            and enter your mobile number then click on{" "}
            <Link to="/authentication" style={{ color: "#FF6F3F" }}>
              CONTINUE
            </Link>
            .
          </>,
          "An OTP will be sent to the mobile number entered by you.",
          "Verify the OTP, and post successful verification, you will be able to log in to Mobigarage.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "How do i login to my Mobigarage account?",
    options: [
      {
        id: "2_1",
        contents: [
          "You can log in to your Mobigarage account with these 3 simple steps:",
          <>
            Click on{" "}
            <Link to="/authentication" style={{ color: "#FF6F3F" }}>
              LOG IN/SIGN UP
            </Link>{" "}
            and enter your mobile number then click on{" "}
            <Link to="/authentication" style={{ color: "#FF6F3F" }}>
              CONTINUE
            </Link>
            .
          </>,
          "An OTP will be sent to the mobile number entered by you.",
          "Verify the OTP, and post successful verification, you will be able to log in to Mobigarage.",
        ],
      },
    ],
  },
];

export const TermsOfUse = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={termNavigator}
            alt="terms Of use"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>Terms of Use</h1>
        </div>
        <p className={classes.box__head__para}>
          Understand the terms and conditions that govern your use of our
          platform. From account creation to transactions, get familiar with the
          rules to ensure a smooth shopping experience.
        </p>
      </div>
      {/* <div className={classes.box__container}>
        {dropdowns.map((dropdown) => (
          <Dropdown
            key={dropdown.id}
            id={dropdown.id}
            title={dropdown.title}
            options={dropdown.options}
          />
        ))}
      </div> */}
    </div>
  );
};
