import React from "react";
import classes from "./openBoxOffers.module.css";

export const OpenBoxOffers = ({ offers }) => {
  const discountOffers = [
    {
      id: 1,
      desc: 'Use code <span class="highlighted">FUEV10</span> to get<span class="highlighted"> 10% </span> discount on order above Rs 30,000',
    },
    {
      id: 2,
      desc: 'Get flat <span class="highlighted">25% off</span> on all orders above Rs 50000',
    },
  ];
  const addClassNames = (desc) => {
    return desc.replace(
      /class="highlighted"/g,
      `class="${classes.highlighted}"`
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__info}>
        <h1 className={classes.container__info__title}>Discount Offers</h1>
        <div className={classes.box}>
          {discountOffers.map((offer) => (
            <div key={offer.id} className={classes.box__desc}>
              <h2
                className={classes.box__desc__text}
                dangerouslySetInnerHTML={{ __html: addClassNames(offer.desc) }}
              ></h2>
            </div>
          ))}
        </div>
      </div>
      <hr className={classes.box__divider} />
    </div>
  );
};
