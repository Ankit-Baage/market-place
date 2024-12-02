import React from "react";
import paymentImage from "../../../assets/help__payment.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./payment.module.css";
import { Link } from "react-router-dom";

export const dropdowns = [
  {
    id: 1,
    title: "What payment methods are available for purchases?",
    options: [
      {
        id: "1_1",
        contents: [
          "You can choose from credit/debit cards, net banking, UPI, wallets, or cash on delivery (COD) for eligible orders.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Are online payments secure?",
    options: [
      {
        id: "2_1",
        contents: [
          "Yes, all online payments are processed through secure gateways to ensure your financial information is protected.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Do I receive confirmation after making a payment?",
    options: [
      {
        id: "3_1",
        contents: [
          "Yes, you’ll receive an instant confirmation and an invoice for every successful transaction.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Can I save my payment methods for future purchases?",
    options: [
      {
        id: "4_1",
        contents: [
          "Yes, you can save your preferred payment methods for faster and more convenient checkouts.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "How is my payment information handled?",
    options: [
      {
        id: "5_1",
        contents: [
          "Your payment details are kept private and secure at all times.",
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
          We offer secure and convenient payment options, including credit/debit
          cards, net banking, UPI, wallets, and COD for eligible orders. Online
          payments are processed through secure gateways, ensuring your
          financial details remain private. You'll receive instant confirmation
          and an invoice for every transaction. Save your preferred payment
          methods for faster future checkouts.
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
