import React from "react";
import returnImage from "../../../assets/help__return.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./return.module.css";
import { Link } from "react-router-dom";

export const dropdowns = [
  {
    id: 1,
    title: "What should I do if I receive a defective, damaged, or incorrect item?",
    options: [
      {
        id: "1_1",
        contents: [
          "If you receive a defective, damaged, or incorrect item, you can initiate a return or exchange within the specified return period through your account.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "How do I request a return for my order?",
    options: [
      {
        id: "2_1",
        contents: [
          "Simply log in to your account and request a return. We’ll arrange for the item to be picked up from your location.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "What happens after the returned item is picked up?",
    options: [
      {
        id: "3_1",
        contents: [
          "Once the returned item is verified, you’ll receive either a refund or a replacement based on your preference.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Can I exchange an item for a different product?",
    options: [
      {
        id: "4_1",
        contents: [
          "Exchanges are only allowed for replacement products of equal value. Select your replacement during the exchange process, and we’ll ship it to you as soon as possible.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "What is the company’s approach to returns and exchanges?",
    options: [
      {
        id: "5_1",
        contents: [
          "We aim to make the returns and exchanges process simple, smooth, and worry-free for our customers.",
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
          If you receive a defective, damaged, or incorrect item, initiate a
          return or exchange within the specified period via your account. We’ll
          arrange pickup, verify the item, and process a refund or replacement
          based on your preference. For exchanges, select a product of equal
          value, and we’ll ship it quickly. Our goal is to ensure a smooth,
          worry-free process.
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
