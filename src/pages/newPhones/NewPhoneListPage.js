import React, { useEffect, useState } from "react";

import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";

import { useNavigate, useSearchParams } from "react-router-dom";

import classes from "./newPhoneListPage.module.css";

import { NewPhoneFilterPage } from "./newPhoneFilters/NewPhoneFiltersPage";
import useGetNewPhoneList from "../../tanstack-query/newPhones/useGetNewPhoneList";
import { NewPhoneItem } from "../../components/newPhone/NewPhoneItem";
import axiosInstance from "../../utils/axios-middleware/axiosMiddleware";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "../../components/carousel/Carousel";

const fetchAdvertisements = async () => {
  const response = await axiosInstance.get(
    "https://dev.backend.mobigarage.com/v1/mp/admin/advertisement",
    {
      params: { category: "new_phones", page: "listing" },
    }
  );
  return response.data;
};

export const NewPhoneListPage = () => {
  const [filters, setFilters] = useState({
    brand: null,
    model: null,
    config: null,
    start: null,
    end: null,
  });
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isSuccess, isLoading, refetch } = useGetNewPhoneList(filters);

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
      <NewPhoneFilterPage
        onApply={handleApplied}
        onPriceApply={handlePriceApplied}
        onSelection={(itemId) => handleRadioApplied(itemId)}
      />

      <div className={classes.box__space}>
        {add?.data?.length > 1 ? (
          <Carousel images={add?.data} />
        ) : (
          <Advertisement image={add?.data.url} />
        )}
        <div className={classes.box__itemList}>
          {data?.map((spareItem, index) => (
            <NewPhoneItem
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
