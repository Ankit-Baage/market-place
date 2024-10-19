import React from "react";
import classes from "./bestSellingProductPage.module.css";
import {
  useGetBestNewPhonesProductList,
  useGetBestOpenBoxProductList,
  useGetBestSparesProductList,
  useGetBestVrpProductList,
} from "../../../tanstack-query/bestSellingProduct/useGetBestSellingProductList";
import { Link, useNavigate } from "react-router-dom";
import { BestSellingVrp } from "../../../components/bestSellingProduct/bestSellingVrp/BestSellingVrp";
import { BestSellingSpares } from "../../../components/bestSellingProduct/bestSellingSpares/BestSellingSpares";
import { BestSellingNewPhones } from "../../../components/bestSellingProduct/bestSellingNewPhones/BestSellingNewPhones";
import { BestSellingOpenBox } from "../../../components/bestSellingProduct/bestSellingOpenBox/BestSellingOpenBox";

export const BestSellingProductPage = () => {
  const { data: vrpData, isLoading: vrpLoading } = useGetBestVrpProductList();
  const { data: sparesData, isLoading: sparesLoading } =
    useGetBestSparesProductList();
  const { data: newPhonesData, isLoading: newPhoneLoading } =
    useGetBestNewPhonesProductList();
  const { data: openBoxData, isLoading: openBoxLoading } =
    useGetBestOpenBoxProductList();

  const navigate = useNavigate();

  const bestSellingSections = [
    {
      title: "VRP (Hot Deals)",
      path: "vrp",
      data: vrpData?.data?.data,
      component: BestSellingVrp,
      keyField: "request_id",
      propName: "vrp",
    },
    {
      title: "Spares (Hot Deals)",
      path: "spares",
      data: sparesData?.data?.data,
      component: BestSellingSpares,
      keyField: "id",
      propName: "spares", // for Spares data
    },
    {
      title: "New Phones (Hot Deals)",
      path: "newPhone",
      data: newPhonesData?.data?.data,
      component: BestSellingNewPhones,
      keyField: "id",
      propName: "newPhones", // for New Phones data
    },
    {
      title: "Open Box (Hot Deals)",
      path: "openBox",
      data: openBoxData?.data?.data,
      component: BestSellingOpenBox,
      keyField: "id",
      propName: "openBox", // for Open Box data
    },
  ];

  return (
    <div className={classes.box}>
      {bestSellingSections.map(
        ({ title, path, data, component: Component, keyField, propName }) => (
          <div key={title} className={classes.box__content}>
            <div className={classes.box__content__category}>
              <h1 className={classes.box__content__category__title}>{title}</h1>
              <Link
                to={path}
                className={classes.box__content__category__link}
              ></Link>
            </div>
            <div className={classes.box__content__container}>
              {data?.map((item) => (
                <Component key={item[keyField]} {...{ [propName]: item }} />
              ))}
            </div>
            <hr className={classes.box__content__sep} />
          </div>
        )
      )}
    </div>
  );
};
