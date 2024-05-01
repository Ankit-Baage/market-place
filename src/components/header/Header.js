import React from "react";
import logo from "../../assets/logoWithName.svg";
import notification from "../../assets/notification.svg";
import classes from "./header.module.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ isPending }) => {
  const status = true;
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate("profile");
  };
  return (
    <div className={classes.container}>
      <div className={classes.container__box__logo}>
        <img src={logo} alt="Logo" className={classes.container__box__img} />
      </div>
      {status && (
        <div
          className={classes.container__box__notification}
          onClick={handleNavigateToProfile}
        >
          <img
            src={notification}
            alt="notification"
            className={classes.container__box__img}
          />
        </div>
      )}
    </div>
  );
};
