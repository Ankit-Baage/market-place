import React from "react";
import grievanceNavigator from "../../../assets/grievanceNavigator.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./grievance.module.css";
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

export const Grievance = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={grievanceNavigator}
            alt="Grievance Officer"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>Grievance Officer</h1>
        </div>
        <p className={classes.box__head__para}>
          At Mobigarage, we specialize in offering a diverse range of products
          to meet all your mobile needs. Our product categories include VRP for
          premium quality devices, Prexo for refurbished products, Spare for
          individual parts like batteries and chargers, Open Box for unboxed
          phones with essential accessories, and New Phones for brand-new,
          seal-packed devices. Whether you're looking for affordability,
          reliability, or the latest technology, Mobigarage has you covered. Our
          commitment is to provide quality, transparency, and excellent value
          for every customer.
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
