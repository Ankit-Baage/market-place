import React from "react";
import accountImage from "../../../assets/help__account.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./account.module.css";
import { Link } from "react-router-dom";

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

export const Account = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={accountImage}
            alt="help account"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>Account</h1>
        </div>
        <p className={classes.box__head__para}>
          With your account, you can update personal info, change your password,
          and manage saved payment methods for faster checkouts. Track orders,
          view past purchases, and access invoices. Keep addresses updated for
          quicker delivery and manage your wishlist. Customize preferences and
          notifications for offers and updates.
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
