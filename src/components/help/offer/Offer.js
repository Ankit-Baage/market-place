import React from "react";
import offerImage from "../../../assets/help__offer.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./offer.module.css";
import { Link } from "react-router-dom";

export const dropdowns = [
  {
    id: 1,
    title: "How can I find offers and coupons for my purchases?",
    options: [
      {
        id: "1_1",
        contents: [
          "Offers and coupons are displayed directly on product pages or during checkout for easy access.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "What types of discounts are available?",
    options: [
      {
        id: "2_1",
        contents: [
          "Discounts include seasonal sales, special promotions, first-time buyer offers, and exclusive deals on phones and accessories.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "How do I apply a coupon code?",
    options: [
      {
        id: "3_1",
        contents: [
          "Enter your coupon code during checkout to enjoy instant savings on your purchase.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "How can I stay updated on the latest deals and promotions?",
    options: [
      {
        id: "4_1",
        contents: [
          "Keep an eye on your notifications and emails for personalized deals and limited-time promotions.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Are the offers available for all customers?",
    options: [
      {
        id: "5_1",
        contents: [
          "Yes, we ensure there’s something for everyone, whether you’re a new or returning customer.",
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
          Enjoy exclusive deals and discounts on phones and accessories. Find
          offers on product pages or at checkout, and apply coupon codes for
          instant savings. From seasonal sales to first-time buyer discounts,
          there’s something for everyone. Check notifications and emails for
          personalized and limited-time promotions.
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
