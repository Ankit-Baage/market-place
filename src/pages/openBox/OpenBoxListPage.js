import React, { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { OpenBoxFilterPage } from "./openBoxFilters/OpenBoxFiltersPage";

import classes from "./openBoxListPage.module.css";

import useGetOpenBoxList from "../../tanstack-query/openBox/useGetOpenBoxList";

import { OpenBoxItem } from "../../components/openBox/OpenBoxItem";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useAddToWishListMutation from "../../tanstack-query/wishList/useAddToWishListMutation";
import { BannerSkeleton } from "../../components/skeletons/bannerSkeleton/BannerSkeleton";
import { ProductSkeleton } from "../../components/skeletons/productSkeleton/ProductSkeleton";
import { BestSellingCardMessage } from "../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";

import { Banner } from "../../components/banner/Banner";
import useGetAdvertisement from "../../tanstack-query/advertisement/useGetAdvertisement";


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
  const advertisementFilters = { category: "open_box", page: "listing" };
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");
  const medium = authToken ? "user" : "guest";
  const user_id = authToken ? userId : guestId;
  const { data: add, isSuccess: addIsSuccess } =
  useGetAdvertisement(advertisementFilters);
  const {
    data: openBoxListData,
    isSuccess,
    isLoading,
  } = useGetOpenBoxList(filters, user_id, medium);



  const {
    mutateAsync,
    isLoading: isAdding,
    isSuccess: isAdded,
    isPending,
  } = useAddToWishListMutation();
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
      {isSuccess && openBoxListData.length > 0 && (
        <OpenBoxFilterPage
          onApply={handleApplied}
          onPriceApply={handlePriceApplied}
          onSelection={(itemId) => handleRadioApplied(itemId)}
        />
      )}

      {addIsSuccess ? <Banner data={add?.data} /> : <BannerSkeleton />}
      <div className={classes.box__item}>
        {isLoading ? (
          <ProductSkeleton /> // Render skeleton while loading
        ) : isSuccess ? (
          openBoxListData?.length > 0 ? (
            <div className={classes.box__item}>
              {openBoxListData?.map((openBoxItem) => (
                <OpenBoxItem
                  key={openBoxItem.id}
                  item={openBoxItem}
                  onClick={navigateToNewPhoneDetail}
                  onWishList={(event) =>
                    handleAddToWishList(event, openBoxItem)
                  }
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
