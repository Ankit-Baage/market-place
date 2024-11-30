import React from "react";
import returnImage from "../../../assets/help__return.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./return.module.css";
import { Link } from "react-router-dom";

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

export const Return = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={returnImage}
            alt="return & exchange help"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>Returns & Exchanges</h1>
        </div>
        <p className={classes.box__head__para}>
          We strive to ensure you're completely satisfied with your purchase. If
          you receive a defective, damaged, or incorrect item, you can easily
          initiate a return or exchange within our specified return period. Our
          process is simple: request a return through your account, and we’ll
          arrange for the item to be picked up from your location. Once the
          returned item is verified, you’ll receive a refund or a replacement
          based on your preference. For exchanges, select a replacement product
          of equal value, and we’ll ship it to you as soon as possible. Our goal
          is to make returns and exchanges smooth and worry-free.
        </p>
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
