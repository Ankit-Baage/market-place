import React, { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import classes from "./newPhoneListPage.module.css";

import { NewPhoneFilterPage } from "./newPhoneFilters/NewPhoneFiltersPage";
import useGetNewPhoneList from "../../tanstack-query/newPhones/useGetNewPhoneList";
import { NewPhoneItem } from "../../components/newPhone/NewPhoneItem";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useAddToWishListMutation from "../../tanstack-query/wishList/useAddToWishListMutation";
import { BannerSkeleton } from "../../components/skeletons/bannerSkeleton/BannerSkeleton";
import { ProductSkeleton } from "../../components/skeletons/productSkeleton/ProductSkeleton";
import { BestSellingCardMessage } from "../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";

import useGetAdvertisement from "../../tanstack-query/advertisement/useGetAdvertisement";
import { Banner } from "../../components/banner/Banner";


export const NewPhoneListPage = () => {
  const [filters, setFilters] = useState({
    brand: null,
    model: null,
    config: null,
    start: null,
    end: null,
  });
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");
  const medium = authToken ? "user" : "guest";
  const user_id = authToken ? userId : guestId;
  const advertisementFilters = { category: "new_phones", page: "listing" };

  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: newPhonesListData,
    isSuccess,
    isLoading,
  } = useGetNewPhoneList(filters, user_id, medium);

  const { data: add, isSuccess: addIsSuccess } =
    useGetAdvertisement(advertisementFilters);

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
      {isSuccess && newPhonesListData.length > 0 && (
        <NewPhoneFilterPage
          onApply={handleApplied}
          onPriceApply={handlePriceApplied}
          onSelection={(itemId) => handleRadioApplied(itemId)}
        />
      )}

      {addIsSuccess ? <Banner data={add?.data} /> : <BannerSkeleton />}
      <div className={classes.box__item}>
        {isLoading ? (
          <ProductSkeleton />
        ) : isSuccess ? (
          newPhonesListData?.length > 0 ? (
            <div className={classes.box__item}>
              {newPhonesListData.map((newPhoneItem) => (
                <NewPhoneItem
                  key={newPhoneItem.id}
                  item={newPhoneItem}
                  onClick={navigateToNewPhoneDetail}
                  onWishList={(event) =>
                    handleAddToWishList(event, newPhoneItem)
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
