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
import { BestSellingSkeleton } from "../../../components/skeletons/bestSellingSkeleton/BestSellingSkeleton";
import { BestSellingCardMessage } from "../../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";

export const BestSellingProductPage = () => {
  const { data: vrpData, isSuccess: vrpIsSuccess } = useGetBestVrpProductList();
  const { data: sparesData, isSuccess: sparesIsSuccess } =
    useGetBestSparesProductList();
  const { data: newPhonesData, isSuccess: newPhoneIsSuccess } =
    useGetBestNewPhonesProductList();
  const { data: openBoxData, isSuccess: openBoxIsSuccess } =
    useGetBestOpenBoxProductList();

  const getComponent = (isSuccess, data, Component) => {
    if (!isSuccess) return BestSellingSkeleton;
    if (data?.length === 0) return BestSellingCardMessage;
    return Component;
  };

  const bestSellingSections = [
    // {
    //   title: "VRP (Hot Deals)",
    //   path: "vrp",
    //   data: vrpData?.data?.data,
    //   component: getComponent(
    //     vrpIsSuccess,
    //     vrpData?.data?.data,
    //     BestSellingVrp
    //   ),
    //   keyField: "request_id",
    //   propName: "vrp",
    // },
    {
      title: "Spares (Hot Deals)",
      path: "spares",
      data: sparesData?.data?.data,
      component: getComponent(
        sparesIsSuccess,
        sparesData?.data?.data,
        BestSellingSpares
      ),
      keyField: "id",
      propName: "spares",
    },
    // {
    //   title: "New Phones (Hot Deals)",
    //   path: "newPhone",
    //   data: newPhonesData?.data?.data,
    //   component: getComponent(
    //     newPhoneIsSuccess,
    //     newPhonesData?.data?.data,
    //     BestSellingNewPhones
    //   ),
    //   keyField: "id",
    //   propName: "newPhones",
    // },
    // {
    //   title: "Open Box (Hot Deals)",
    //   path: "openBox",
    //   data: openBoxData?.data?.data,
    //   component: getComponent(
    //     openBoxIsSuccess,
    //     openBoxData?.data?.data,
    //     BestSellingOpenBox
    //   ),
    //   keyField: "id",
    //   propName: "openBox",
    // },
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
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                  <Component key={item[keyField]} {...{ [propName]: item }} />
                ))
              ) : (
                <Component />
              )}
            </div>
            <hr className={classes.box__content__sep} />
          </div>
        )
      )}
    </div>
  );
};
