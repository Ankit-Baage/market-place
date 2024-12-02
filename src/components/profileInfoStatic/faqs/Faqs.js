import React from "react";
import faqNavigator from "../../../assets/faqNavigator.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./faqs.module.css";
import { Link } from "react-router-dom";

export const dropdowns = [
  {
    id: 1,
    title: "How do I initiate a return or exchange?",
    options: [
      {
        id: "1_1",
        contents: [
          "Initiate a return or exchange through your account within the specified period.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "What happens after I return an item?",
    options: [
      {
        id: "2_1",
        contents: [
          "We’ll arrange pickup, verify the item, and process a refund or replacement based on your preference.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Can I exchange an item for a different product?",
    options: [
      {
        id: "3_1",
        contents: [
          "Yes, you can exchange an item for a product of equal value.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Where can I find exclusive deals and discounts?",
    options: [
      {
        id: "4_1",
        contents: [
          "Offers are available on product pages or at checkout.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "How do I apply a coupon code?",
    options: [
      {
        id: "5_1",
        contents: [
          "Apply coupon codes at checkout for instant savings.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "What payment methods are available?",
    options: [
      {
        id: "6_1",
        contents: [
          "We accept credit/debit cards, net banking, UPI, wallets, and COD for eligible orders.",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Is my payment information secure?",
    options: [
      {
        id: "7_1",
        contents: [
          "Yes, payments are processed through secure gateways to protect your financial details.",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Will I get a confirmation after making a payment?",
    options: [
      {
        id: "8_1",
        contents: [
          "Yes, you’ll receive instant confirmation and an invoice for every successful transaction.",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Can I save my payment methods for future use?",
    options: [
      {
        id: "9_1",
        contents: [
          "Yes, you can save your preferred payment methods for quicker checkouts.",
        ],
      },
    ],
  },
  {
    id: 10,
    title: "What product categories does Mobigarage offer?",
    options: [
      {
        id: "10_1",
        contents: [
          "We offer VRP (premium devices), Prexo (refurbished phones), Spare (individual parts), Open Box (unboxed phones with accessories), and New Phones (brand-new devices).",
        ],
      },
    ],
  },
  {
    id: 11,
    title: "How can I manage my account information?",
    options: [
      {
        id: "11_1",
        contents: [
          "You can update personal info, change your password, and manage saved payment methods through your account.",
        ],
      },
    ],
  },
  {
    id: 12,
    title: "How do I track my orders?",
    options: [
      {
        id: "12_1",
        contents: [
          "Track your orders, view past purchases, and access invoices directly from your account.",
        ],
      },
    ],
  },
];


export const Faqs = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={faqNavigator}
            alt="Faqs"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>FAQs</h1>
        </div>
        <p className={classes.box__head__para}>
          Have questions? We’ve got answers! Browse our Frequently Asked
          Questions for quick solutions to common queries about orders,
          payments, shipping, and more.
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
