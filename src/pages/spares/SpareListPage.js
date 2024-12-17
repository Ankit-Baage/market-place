import React, { useEffect } from "react";

import classes from "./spareListPage.module.css";
import useGetSpareList from "../../tanstack-query/spares/useGetSpareList";
import { SpareItem } from "../../components/spares/SpareItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SparesFilterPage } from "./filters/sparesFilter/SparesFilterPage";

import Cookies from "js-cookie";
import useAddToWishListMutation from "../../tanstack-query/wishList/useAddToWishListMutation";
import { toast } from "react-toastify";
import { BannerSkeleton } from "../../components/skeletons/bannerSkeleton/BannerSkeleton";
import { ProductSkeleton } from "../../components/skeletons/productSkeleton/ProductSkeleton";
import { BestSellingCardMessage } from "../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterOptions,
  setFilterOption,
} from "../../store/category/categorySlice";

import { Banner } from "../../components/banner/Banner";
import useGetAdvertisement from "../../tanstack-query/advertisement/useGetAdvertisement";

export const SpareListPage = () => {
  const filters = useSelector(selectFilterOptions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");
  const medium = authToken ? "user" : "guest";
  const user_id = authToken ? userId : guestId;
  const advertisementFilters = { category: "spares", page: "listing" };

  const [searchParams, setSearchParams] = useSearchParams();
  const { data: add, isSuccess: addIsSuccess } =
    useGetAdvertisement(advertisementFilters);

  const {
    data: sparesListData,
    isSuccess,
    isLoading,
  } = useGetSpareList(filters, user_id, medium);

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
      start: searchParams.get("start") || null,
      end: searchParams.get("end") || null,
      sort: searchParams.get("sort") || null,
    };
    // setFilters(newFilters);
    dispatch(
      setFilterOption({
        brand: newFilters.brand,
        spare: newFilters.spare,
        model: newFilters.model,
        start: newFilters.start,
        end: newFilters.end,
        sort: newFilters.sort,
      })
    );
  }, [dispatch, searchParams]);

  const navigateToSpareDetail = (requestId) => {
    navigate(`${requestId}`);
  };

  const handleAddToWishList = async (item) => {
    const data = {
      category_id: item.category_id,
      item_id: item.id,
      master_product_id: item.master_product_id,
    };

    try {
      const response = await mutateAsync(data);
      console.log("API Response:", response); // Check full API response
    console.log("Display Message:", response?.message?.displayMessage); // Chec
      toast.success(response?.data?.message?.displayMessage);
      console.log(item);
    } catch (error) {
      toast.error(error?.response?.data?.message.displayMessage);
    }
  };

  return (
    <div className={classes.box}>
      <SparesFilterPage />

      {addIsSuccess ? <Banner data={add?.data} /> : <BannerSkeleton />}

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
                  onWishList={() => handleAddToWishList(spareItem)}
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
