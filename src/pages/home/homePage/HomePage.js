import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../../../components/header/Header";
import { SearchInput } from "../../../components/searchInput/SearchInput";
import prexo from "../../../assets/prexo.svg";
import vrp from "../../../assets/vrp.svg";
import openBox from "../../../assets/openBox.svg";
import spares from "../../../assets/spare.svg";
import newPhone from "../../../assets/new_phone.svg";


import { BestSellingProductPage } from "../bestSellingProducts/BestSellingProductPage";
import { BannerSkeleton } from "../../../components/skeletons/bannerSkeleton/BannerSkeleton";
import classes from "./homePage.module.css";

import useGetAdvertisement from "../../../tanstack-query/advertisement/useGetAdvertisement";
import { Banner } from "../../../components/banner/Banner";


const buttonRoutes = [
  // { id: "vrp", image: vrp, label: "VRP" },
  { id: "spares", image: spares, label: "Spares" },
  // { id: "openBox", image: openBox, label: "Open Box" },
  // { id: "newPhone", image: newPhone, label: "New Phone" },
  // { id: "prexo", image: prexo, label: "Prexo" },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(0);

  const placeholder = "Search for mobile, accessories & more";
  const advertisementFilters = { category: "home", page: "landing" };

  const carousel = useRef();

  const { data: add, isSuccess: addIsSuccess } =
    useGetAdvertisement(advertisementFilters);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

 
  // console.log("params", params)
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
                  <img src={button.image} alt={button.id} />
                  <h3 className={classes.container__routes__btns__text}>
                    {button.label}
                  </h3>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      {addIsSuccess ? <Banner data={add?.data} /> : <BannerSkeleton />}

      <BestSellingProductPage />
    </div>
  );
};
