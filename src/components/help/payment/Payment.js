import React from "react";
import paymentImage from "../../../assets/help__payment.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./payment.module.css";
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

export const Payment = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={paymentImage}
            alt="payment help"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>Payments</h1>
        </div>
        <p className={classes.box__head__para}>
          We offer a variety of payment methods to make your shopping experience
          convenient and secure. Choose from credit or debit cards, net banking,
          UPI, wallets, or cash on delivery (COD) for eligible orders. All
          online payments are processed through secure gateways to protect your
          financial information. You’ll receive an instant confirmation and an
          invoice for every successful transaction. For added convenience, you
          can save your preferred payment methods for faster checkout in the
          future. Rest assured, your payment details are kept private and secure
          at all times.
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
