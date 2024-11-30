import React from "react";
import offerImage from "../../../assets/help__offer.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./offer.module.css";
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

export const Offer = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={offerImage}
            alt="offer help"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>Offers/Coupons</h1>
        </div>
        <p className={classes.box__head__para}>
          Make the most of your shopping experience with our exclusive offers
          and discount coupons. Stay updated on the latest deals and promotions
          to save more on your favorite phones and accessories. You can find
          available offers directly on the product pages or during checkout.
          Apply coupon codes effortlessly to enjoy instant savings. Whether it’s
          seasonal sales, special discounts, or first-time buyer offers, we
          ensure there’s always something for everyone. Keep an eye on your
          notifications and emails for personalized deals and limited-time
          promotions.
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
