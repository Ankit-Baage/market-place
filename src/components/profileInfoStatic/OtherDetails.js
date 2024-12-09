import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { otherDetails } from "../../webStaticData/otherDetails";
import Dropdown from "../dropDown/DropDown";
import classes from "./otherDetails.module.css";

export const OtherDetails = () => {
  const { detailCategory: detailParams } = useParams();
  const otherDetail = useMemo(
    () => otherDetails.find((el) => el.page === detailParams),
    [detailParams]
  );
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__info}>
          <img
            src={otherDetail.image}
            alt={otherDetail.page}
            className={classes.box__head__img}
          />
          <h1 className={classes.box__head__title}>{otherDetail.name}</h1>
        </div>
        <p className={classes.box__head__para}>{otherDetail.description}</p>
      </div>
      {otherDetail.dropdowns && (
        <div className={classes.box__container}>
          {otherDetail.dropdowns.map((dropdown) => (
            <Dropdown
              key={dropdown.id}
              id={dropdown.id}
              title={dropdown.title}
              options={dropdown.options}
            />
          ))}
        </div>
      )}
      {otherDetail.benefits && (
        <div className={classes.box__benefits}>
          <h2 className={classes.box__benefits__title}>Benefits:</h2>
          <div className={classes.box__benefits__content}>
            {otherDetail.benefits.map((benefit, index) => (
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
          <h1 className={classes.box__benefits__content__contact}>
            Contact the Grievance Officer for quick, reliable support!
          </h1>
        </div>
      )}
    </div>
  );
};
