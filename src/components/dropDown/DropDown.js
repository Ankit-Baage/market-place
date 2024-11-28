import React from "react";
import classes from "./dropDown.module.css";

const Dropdown = ({ title, options, id }) => {
  return (
    <div className={classes.dropDown__wrapper}>
      <div className={classes.dropdown}>
        <label htmlFor={id} className={classes.dropdown__label}>
          {title}
        </label>
        <input
          type="checkbox"
          name={id}
          id={id}
          className={classes.dropDown__input}
        />
        <span className={classes.dropdown__icon} />

        <div className={classes.dropdown__menu}>
          {options.map((option) => (
            <div
              key={option.id}
              className={classes.dropdown__menu__item}
            >
              {option.contents.map((content, index) => (
                <h5 key={index} className={classes.dropDown__menu__item__name}>
                  {content}
                </h5>
              ))}
            </div>
          ))}
        </div>
      </div>
      <hr className={classes.dropDown__sep} />
    </div>
  );
};

export default Dropdown;
