import React from "react";
import Cookies from "js-cookie";
import logo from "../../assets/logoWithName.svg";
import notification from "../../assets/notification.svg";
import classes from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Header = () => {
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");

  const handleLogIn = () => {
    navigate("/authentication");
  };

  const handleNavigateToProfile = () => {
    toast.success("Notifications Are On Their Way !");
  };
  return (
    <div className={classes.container}>
      <div className={classes.container__box__logo}>
        <img src={logo} alt="Logo" className={classes.container__box__img} />
      </div>
      {authToken ? (
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
      ) : (
        <button className={classes.box__btn} onClick={handleLogIn}/>
      )}
    </div>
  );
};
