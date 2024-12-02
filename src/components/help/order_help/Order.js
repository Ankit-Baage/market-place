import React from "react";
import OrderImage from "../../../assets/help__order.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./orderHelp.module.css";
import { Link } from "react-router-dom";

export const dropdowns = [
  {
    id: 1,
    title: "How can I track the status of my order?",
    options: [
      {
        id: "1_1",
        contents: [
          "You can track your order in real-time, from confirmation to delivery, directly from your account.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Can I make changes to my order after placing it?",
    options: [
      {
        id: "2_1",
        contents: [
          "Yes, you can contact our support team to make changes, but only before the order is shipped.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Where can I find details about my past purchases?",
    options: [
      {
        id: "3_1",
        contents: [
          "Your account provides access to detailed information about past purchases, including product details, invoices, and payment summaries.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Is it possible to reorder a product I previously purchased?",
    options: [
      {
        id: "4_1",
        contents: [
          "Yes, you can easily reorder items from your purchase history.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "How does the order management system make shopping easier?",
    options: [
      {
        id: "5_1",
        contents: [
          "It provides real-time tracking, order modification options, and access to past purchase details, making order management seamless and convenient.",
        ],
      },
    ],
  },
];


export const OrderHelp = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={OrderImage}
            alt="order help"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>Orders</h1>
        </div>
        <p className={classes.box__head__para}>
          Easily manage your orders with real-time tracking from confirmation to
          delivery. Contact support for changes before shipping. Access past
          purchase details, invoices, and payment summaries, or quickly
          reorder—all from your account.
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
