import React from "react";
import accountImage from "../../../assets/help__account.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./account.module.css";

export const dropdowns = [
  {
    id: 1,
    title: "How do i login to my Mobigarage account?",
    options: [
      {
        id: "1_1",
        contents: [
          "You can login to your Mobigarage account with these 3 simple steps:",
          "Click on LOG IN/SIGN UP and enter your mobile number then click on CONTINUE",
          "An OTP will be sent to the mobile number entered by you.",
          "Verify the OTP and post successful verification, you will be able to log in to Mobigarage",
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
          "You can login to your Mobigarage account with these 3 simple steps:",
          "Click on LOG IN/SIGN UP and enter your mobile number then click on CONTINUE",
          "An OTP will be sent to the mobile number entered by you.",
          "Verify the OTP and post successful verification, you will be able to log in to Mobigarage",
        ],
      },
    ],
  },
];

export const Account = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <img
          src={accountImage}
          alt="help account"
          className={classes.box__head__img}
        />
        <h1 className={classes.box__head__title}>Account</h1>
      </div>
      <div className={classes.box__container}>
        {dropdowns.map((dropdown) => (
          <Dropdown
            key={dropdown.id}
            id={dropdown.id}
            title={dropdown.title}
            options={dropdown.options}
          />
        ))}
      </div>
    </div>
  );
};
