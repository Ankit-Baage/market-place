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
import prexo from "../../../assets/prexo_button.svg";
import vrp from "../../../assets/vrp_button.svg";
import openBox from "../../../assets/openBox_button.svg";
import spare from "../../../assets/spare.svg";

import { BestSellingProducts } from "../bestSellingProducts/BestSellingProducts";
import { Carousel } from "../../../components/carousel/Carousel";

const buttonRoutes = [
  { id: "spares", image: prexo },
  { id: "vrp", image: vrp },
  { id: "openBox", image: openBox },
  { id: "spare", image: spare },
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
                  style={{
                    backgroundImage: `url(${button.image})`,
                    cursor: "pointer",
                  }}
                  to={button.id}
                ></Link>
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
