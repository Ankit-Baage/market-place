import React, { useEffect, useState } from "react";

import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";

import { useNavigate, useSearchParams } from "react-router-dom";
import { OpenBoxFilterPage} from "./openBoxFilters/OpenBoxFiltersPage"

import classes from "./openBoxListPage.module.css";


import useGetOpenBoxList from "../../tanstack-query/openBox/useGetOpenBoxList";

import axiosInstance from "../../utils/axios-middleware/axiosMiddleware";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "../../components/carousel/Carousel";
import { OpenBoxItem } from "../../components/openBox/OpenBoxItem";
import Cookies from 'js-cookie';

const fetchAdvertisements = async () => {
  const response = await axiosInstance.get(
    "https://dev.backend.mobigarage.com/v1/mp/admin/advertisement",
    {
      params: { category: "new_phones", page: "listing" },
    }
  );
  return response.data;
};



export const OpenBoxListPage = () => {
  const [filters, setFilters] = useState({
    brand: null,
    model: null,
    config: null,
    start: null,
    end: null,
  });
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const user_id = Cookies.get('user_id');
  const { data, isSuccess, isLoading, refetch } = useGetOpenBoxList(filters,user_id);

  const {
    data: add,
    error,
    isLoading: addisLoading,
  } = useQuery({
    queryKey: ["advertisements", "new_phones", "listing"],
    queryFn: fetchAdvertisements,
  });
  useEffect(() => {
    const newFilters = {
      brand: searchParams.get("brand") || null,
      model: searchParams.get("model") || null,
      config: searchParams.get("config") || null,
      price: { start: null, end: null },
    };
    setFilters(newFilters);
  }, [searchParams]);

  const navigateToNewPhoneDetail = (requestId) => {
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
    console.log(itemId);
  };

  return (
    <div className={classes.box}>
      <OpenBoxFilterPage
        onApply={handleApplied}
        onPriceApply={handlePriceApplied}
        onSelection={(itemId) => handleRadioApplied(itemId)}
      />

      <div className={classes.box__space}>
        {add?.data?.length > 1 ? (
          <Carousel images={add?.data} />
        ) : (
          <Advertisement image={add?.data[0].url} />
        )}
        <div className={classes.box__itemList}>
          {data?.map((spareItem) => (
            <OpenBoxItem
              key={spareItem.id}
              item={spareItem}
              onClick={navigateToNewPhoneDetail}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
