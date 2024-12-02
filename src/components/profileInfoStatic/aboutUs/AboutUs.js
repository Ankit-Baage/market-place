import React from "react";
import aboutNavigator from "../../../assets/aboutNavigator.svg";
import Dropdown from "../../dropDown/DropDown";
import { Link } from "react-router-dom";
import classes from "./aboutUs.module.css";

export const dropdowns = [
  {
    id: 1,
    title: "How do I login to my Mobigarage account?",
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
    title: "How do I update my personal information?",
    options: [
      {
        id: "2_1",
        contents: [
          'You can update your details in the "Account Details" section.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Can I change my password?",
    options: [
      {
        id: "3_1",
        contents: [
          'Yes, you can reset your password anytime from the "Password" section.',
        ],
      },
    ],
  },
  {
    id: 4,
    title: "How can I view my order history?",
    options: [
      {
        id: "4_1",
        contents: [
          'Your order history is available under the "Order History" tab.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: "How do I add or remove addresses?",
    options: [
      {
        id: "5_1",
        contents: ['You can manage addresses in the "Address Book" section.'],
      },
    ],
  },
  {
    id: 6,
    title: "Can I delete my account?",
    options: [
      {
        id: "6_1",
        contents: [
          "Contact customer support if you wish to delete your account.",
        ],
      },
    ],
  },
];

export const AboutUs = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={aboutNavigator}
            alt="About Us"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>About Us</h1>
        </div>
        <p className={classes.box__head__para}>
          MobiGarage is a pre-owned business scaling platform. Established in
          2019, it has been a pioneer in bringing refurbished smartphones to the
          tier 2, 3, & beyond markets. It is an organized platform that
          successfully integrates the existing extensive retail footprint of
          phone sellers and repair kiosks. MobiGarage is increasing the
          accessibility to quality and affordable smartphones for its end
          customer. It is shortening the gaps in the stock inventory and prices
          which are usually experienced in the unorganized pre-owned
          device industry.
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
