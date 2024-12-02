import React from "react";
import grievanceNavigator from "../../../assets/grievanceNavigator.svg";
import Dropdown from "../../dropDown/DropDown";
import classes from "./grievance.module.css";

export const benefits = [
  {
    desc_1: "Quick Issue Resolution.",
    desc_2:
      "Get fast solutions for order, return, exchange, or product issues.",
  },
  {
    desc_1: "Personalized Support",
    desc_2: "Receive tailored assistance for your specific concerns.",
  },
  {
    desc_1: "Escalation for Unresolved Issues",
    desc_2: "If necessary, your issue will be escalated for faster resolution.",
  },
  {
    desc_1: "Clear Communication",
    desc_2: "Stay updated on the progress of your issue.",
  },
  {
    desc_1: "Service Improvement",
    desc_2: "Your feedback helps us enhance our services.",
  },
];

export const Grievance = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={grievanceNavigator}
            alt="Grievance Officer"
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>Grievance Officer</h1>
        </div>
        <p className={classes.box__head__para}>
          At MobiGarage, our Grievance Officer ensures any issues you face are
          resolved promptly and effectively.
        </p>
      </div>
      <div className={classes.box__benefits}>
        <h2 className={classes.box__benefits__title}>Benefits:</h2>
        <div className={classes.box__benefits__content}>
          {benefits.map((benefit, index) => (
            <div key={index} className={classes.box__benefits__content__info}>
              <h3 className={classes.box__benefits__content__info__desc_1}>
                {benefit.desc_1}
              </h3>
              <h3 className={classes.box__benefits__content__info__desc}>
                {benefit.desc_2}
              </h3>
            </div>
          ))}
        </div>
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
      <h1 className={classes.box__benefits__content__contact}>Contact the Grievance Officer for quick, reliable support!</h1>
    </div>
  );
};
