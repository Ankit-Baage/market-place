import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./homePage.module.css";
import Cookies from "js-cookie";
import { getAuthToken } from "../../../utils/helpers/getAuth";
import { Header } from "../../../components/header/Header";
import { SearchInput } from "../../../components/searchInput/SearchInput";
import prexo from "../../../assets/prexo_button.svg";
import vrp from "../../../assets/vrp_button.svg";
import openBox from "../../../assets/openBox_button.svg";

import { BestSellingProducts } from "../bestSellingProducts/BestSellingProducts";
import { Carousel } from "../../../components/carousel/Carousel";

const buttonRoutes = [
  { id: "prexo", image: prexo },
  { id: "vrp", image: vrp },
  { id: "openBox", image: openBox },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const autToken = getAuthToken();

  const placeholder = "Search for mobile, accessories & more";

  const handleProfile = () => {
    navigate("profile");
  };

  const navigateToPath = () => {
    navigate("vrp");
  };

  const handleLogOut = () => {
    Cookies.remove("authToken");
    console.log(Cookies.get("authToken"));
    navigate("/");
  };
  return (
    <div className={classes.container}>
      <div className={classes.container__box}>
        <Header />

        <div className={classes.container__search}>
          <SearchInput placeholder={placeholder} />
        </div>
        <div className={classes.container__routes}>
          {buttonRoutes.map((button) => (
            <button
              type="submit"
              key={button.id}
              className={classes.container__routes__btns}
              style={{ backgroundImage: `url(${button.image})`, cursor:"pointer" }}
              onClick={navigateToPath}
            ></button>
          ))}
        </div>
      </div>

      <div className={classes.container__box__content}>
        <div className={classes.container__carousel}>
          <Carousel />
        </div>
        <div className={classes.container__bestSelling}>
          <BestSellingProducts />
        </div>

        <div className={classes.container__bestSelling}>
          <BestSellingProducts />
        </div>
        <div className={classes.container__bestSelling}>
          <BestSellingProducts />
        </div>
        <div className={classes.container__bestSelling}>
          <BestSellingProducts />
        </div>
      </div>
    </div>
  );
};
