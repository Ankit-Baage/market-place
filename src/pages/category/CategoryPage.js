import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Category } from "../../components/category/Category";
import { Header } from "../../components/header/Header";
import { SearchInput } from "../../components/searchInput/SearchInput";
import classes from "./categoryPage.module.css";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios-middleware/axiosMiddleware";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { Carousel } from "../../components/carousel/Carousel";
import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";
import { useNavigate } from "react-router-dom";

const fetchAdvertisements = async () => {
  const response = await axiosInstance.get(
    "https://dev.backend.mobigarage.com/v1/mp/admin/advertisement",
    {
      params: { category: "home", page: "landing" },
    }
  );
  return response.data;
};

export const CategoryPage = () => {
 
  const placeholder = "Search for mobile, accessories & more";

  const {
    data: add,
    error,
    isLoading: addisLoading,
  } = useQuery({
    queryKey: ["advertisements", "home", "landing"],
    queryFn: fetchAdvertisements,
  });


  return (
    <div className={classes.container}>
      <div className={classes.container__box}>
        <Header />

        <div className={classes.container__search}>
          <SearchBar placeholder={placeholder} />
        </div>
        <div className={classes.container__carousel}>
          {add?.data.length > 1 ? (
            <Carousel images={add?.data} />
          ) : (
            <Advertisement image={add?.data[0].url} />
          )}
        </div>
      </div>
      <Category />
    </div>
  );
};
