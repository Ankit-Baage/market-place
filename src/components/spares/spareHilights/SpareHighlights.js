import React from "react";
import classes from "./spareHighlight.module.css";

export const SpareHighlights = ({ highlights }) => {
  const descriptions = [
    { id: 1, desc: "Description 1" },
    { id: 2, desc: "Description 2" },
    { id: 3, desc: "Description 3" },
    { id: 4, desc: "Description 4" },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.container__info}>
        <h1 className={classes.container__info__title}>Highlights</h1>
        <div className={classes.box}>
          {descriptions.map((description) => (
            <div key={description.id} className={classes.box__desc}>
              <div className={classes.box__desc__bullet} />
              <h2 className={classes.box__desc__text}>{description.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <hr className={classes.box__divider} />
    </div>
  );
};
