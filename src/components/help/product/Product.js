import React from "react";
import productImage from "../../../assets/help__product.svg";
import Dropdown from "../../dropDown/DropDown";
import { Link } from "react-router-dom";
import classes from "./product.module.css";

export const dropdowns = [
  {
    id: 1,
    title: "What is VRP at Mobigarage?",
    options: [
      {
        id: "1_1",
        contents: [
          "VRP offers premium quality mobile devices for customers seeking high-end options.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "What products are available under Prexo?",
    options: [
      {
        id: "2_1",
        contents: [
          "Prexo features refurbished phones, providing a cost-effective and eco-friendly choice.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "What items are included in the Spare category?",
    options: [
      {
        id: "3_1",
        contents: [
          "Spare includes individual mobile parts like batteries, chargers, and other accessories for repairs.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "What does the Open Box category offer?",
    options: [
      {
        id: "4_1",
        contents: [
          "Open Box features unboxed phones along with essential accessories, offering great value on slightly used devices.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "What types of phones can I find in the New Phones category?",
    options: [
      {
        id: "5_1",
        contents: [
          "The New Phones category offers brand-new, seal-packed devices for customers wanting the latest models.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Which category is best for budget-friendly options?",
    options: [
      {
        id: "6_1",
        contents: [
          "The Prexo and Open Box categories are ideal for affordable options without compromising quality.",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "How does Mobigarage ensure product quality across categories?",
    options: [
      {
        id: "7_1",
        contents: [
          "We prioritize quality, transparency, and customer value across all categories, ensuring you get reliable products.",
        ],
      },
    ],
  },
];


export const Product = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={productImage}
            alt="product help"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>Products</h1>
        </div>
        <p className={classes.box__head__para}>
          At Mobigarage, we offer a wide range of mobile products, including VRP
          for premium devices, Prexo for refurbished phones, Spare for
          individual parts, Open Box for unboxed phones with accessories, and
          New Phones for brand-new devices. Whether you seek affordability,
          reliability, or the latest technology, we provide quality and value
          for every customer.
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
