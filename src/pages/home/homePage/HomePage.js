import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import classes from "./homePage.module.css";
import Cookies from "js-cookie";
import { getAuthToken } from "../../../utils/helpers/getAuth";
import { Header } from "../../../components/header/Header";
import { SearchInput } from "../../../components/searchInput/SearchInput";
import prexo from "../../../assets/prexo.svg";
import vrp from "../../../assets/vrp.svg";
import openBox from "../../../assets/openBox.svg";
import spares from "../../../assets/spare.svg";
import newPhone from "../../../assets/new_phone.svg";

import { BestSellingProducts } from "../bestSellingProducts/BestSellingProducts";
import { Carousel } from "../../../components/carousel/Carousel";

const buttonRoutes = [
  { id: "prexo", image: prexo, label:"Prexo" },
  { id: "vrp", image: vrp, label: "VRP" },
  { id: "openBox", image: openBox, label:"Open Box" },
  { id: "spares", image: spares, label:"Spares" },
  { id: "newPhone", image: newPhone, label:"New Phone" },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const autToken = getAuthToken();
  const [width, setWidth] = useState(0);

  const placeholder = "Search for mobile, accessories & more";

  const carousel = useRef();

  useEffect(() => {
    console.log("scrollWidth:", carousel.current.scrollWidth);
    console.log("offsetWidth:", carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

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
          <motion.div className={classes.box__colors__carousel} ref={carousel}>
            <motion.div
              className={classes.box__colors__carousel__inner}
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              {buttonRoutes.map((button) => (
                <Link
                  key={button.id}
                  className={classes.container__routes__btns}
                  to={button.id}
                >
                  <img src={button.image} alt={button.id}
                  />
                  <h3 className={classes.container__routes__btns__text}>{button.label}</h3>
                </Link>
              ))}
            </motion.div>
          </motion.div>
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
