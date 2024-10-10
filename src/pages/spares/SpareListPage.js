import React, { useEffect, useState } from "react";

import spare_Advertisement from "../../assets/spare_Advertisement.png";

import classes from "./spareListPage.module.css";
import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";
import useGetSpareList from "../../tanstack-query/spares/useGetSpareList";
import { SpareItem } from "../../components/spares/SpareItem";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SparesFilterPage } from "./filters/sparesFilter/SparesFilterPage";
import axiosInstance from "../../utils/axios-middleware/axiosMiddleware";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "../../components/carousel/Carousel";
import Cookies from 'js-cookie';

const fetchAdvertisements = async () => {
  const response = await axiosInstance.get(
    "https://dev.backend.mobigarage.com/v1/mp/admin/advertisement",
    {
      params: { category: "spares", page: "listing" },
    }
  );
  return response.data;
};

export const SpareListPage = () => {
  const [filters, setFilters] = useState({
    brand: null,
    spare: null,
    model: null,
    start: null,
    end: null,
  });
  const navigate = useNavigate();
  const user_id = Cookies.get('user_id');

  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isSuccess, isLoading, refetch } = useGetSpareList(filters, user_id);
  const {
    data: add,
    error,
    isLoading: addisLoading,
  } = useQuery({
    queryKey: ["advertisements", "spares", "listing"],
    queryFn: fetchAdvertisements,
  });
  useEffect(() => {
    const newFilters = {
      brand: searchParams.get("brand") || null,
      spare: searchParams.get("spare") || null,
      model: searchParams.get("model") || null,
      price: { start: null, end: null },
    };
    setFilters(newFilters);
  }, [searchParams]);

  const navigateToSpareDetail = (requestId) => {
    navigate(`${requestId}`);
  };
  console.log(filters);

  const handleApplied = (selectedFilters) => {
    const { type, options } = selectedFilters;
    const newFilters = { ...filters, [type]: options.join(",") };

    setFilters(newFilters);
  };

  const handlePriceApplied = (start, end) => {
    setSearchParams((params) => {
      params.set("start", start);
      params.set("end", end);
      return params.toString();
    });
    setFilters((prevFilters) => ({
      ...prevFilters,
      start: start,
      end: end,
    }));
    const sortParams = searchParams.get("sort");
    if (sortParams) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        sort: sortParams,
      }));
    }
  };

  const handleRadioApplied = (itemId) => {
    setSearchParams((params) => {
      params.set("sort", itemId);
      return params.toString();
    });
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   sort: itemId,
    // }));
    console.log(itemId);
  };

  return (
    <div className={classes.box}>
      <SparesFilterPage
        onApply={handleApplied}
        onPriceApply={handlePriceApplied}
        onSelection={(itemId) => handleRadioApplied(itemId)}
      />
      {/* <Advertisement image={spare_Advertisement} /> */}

      <div className={classes.box__space}>
        {add?.data?.length > 1 ? (
          <Carousel images={add?.data} />
        ) : (
          <Advertisement image={add?.data[0].url} />
        )}
        <div className={classes.box__itemList}>
          {data?.map((spareItem, index) => (
            <SpareItem
              key={spareItem.id}
              item={spareItem}
              onClick={navigateToSpareDetail}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
