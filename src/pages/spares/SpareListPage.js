import React, { useEffect, useState } from "react";

import classes from "./spareListPage.module.css";
import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";
import useGetSpareList from "../../tanstack-query/spares/useGetSpareList";
import { SpareItem } from "../../components/spares/SpareItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SparesFilterPage } from "./filters/sparesFilter/SparesFilterPage";
import axiosInstance from "../../utils/axios-middleware/axiosMiddleware";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "../../components/carousel/Carousel";
import Cookies from "js-cookie";
import useAddToWishListMutation from "../../tanstack-query/wishList/useAddToWishListMutation";
import { toast } from "react-toastify";
import { BannerSkeleton } from "../../components/skeletons/bannerSkeleton/BannerSeleton";
import { ProductSkeleton } from "../../components/skeletons/productSkeleton/ProductSkeleton";
import { BestSellingCardMessage } from "../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";

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
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");
  const medium = authToken ? "user" : "guest";
  const user_id = authToken ? userId : guestId;

  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: sparesListData,
    isSuccess,
    isLoading,
  } = useGetSpareList(filters, user_id, medium);
  const { data: add, isSuccess: addIsSuccess } = useQuery({
    queryKey: ["advertisements", "spares", "listing"],
    queryFn: fetchAdvertisements,
  });

  const {
    mutateAsync,
    isLoading: isAdding,
    isSuccess: isAdded,
    isPending,
  } = useAddToWishListMutation();
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
  };
  const handleAddToWishList = async (event, item) => {
    event.stopPropagation();

    const data = {
      category_id: item.category_id,
      item_id: item.id,
      master_product_id: item.master_product_id,
    };

    try {
      const response = await mutateAsync(data);
      toast.success(response.message.displayMessage);
      console.log(item);
    } catch (error) {
      // toast.error(error.response.message.displayMessage);
    }
  };

  return (
    <div className={classes.box}>
      {isSuccess && sparesListData.length > 0 && (
        <SparesFilterPage
          onApply={handleApplied}
          onPriceApply={handlePriceApplied}
          onSelection={(itemId) => handleRadioApplied(itemId)}
        />
      )}

      {addIsSuccess ? (
        <div className={classes.box__space}>
          {add?.data?.length > 1 ? (
            <Carousel images={add?.data} />
          ) : (
            <Advertisement image={add?.data[0].url} />
          )}
        </div>
      ) : (
        <BannerSkeleton />
      )}

      <div className={classes.box__itemList}>
        {isLoading ? (
          <ProductSkeleton />
        ) : isSuccess ? (
          sparesListData.length > 0 ? (
            <div className={classes.box__itemList}>
              {sparesListData?.map((spareItem) => (
                <SpareItem
                  key={spareItem.id}
                  item={spareItem}
                  onClick={navigateToSpareDetail}
                  onWishList={(event) => handleAddToWishList(event, spareItem)}
                />
              ))}
            </div>
          ) : (
            <BestSellingCardMessage />
          )
        ) : null}
      </div>
    </div>
  );
};
