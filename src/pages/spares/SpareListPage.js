import React, { useEffect } from "react";

import classes from "./spareListPage.module.css";
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
import { BannerSkeleton } from "../../components/skeletons/bannerSkeleton/BannerSkeleton";
import { ProductSkeleton } from "../../components/skeletons/productSkeleton/ProductSkeleton";
import { BestSellingCardMessage } from "../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterOptions,
  setFilterOption,
} from "../../store/catergory/categorySlice";
import { Advertisement } from "../../components/advertisement/Advertisement";

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
  // const [filters, setFilters] = useState({
  //   brand: null,
  //   spare: null,
  //   model: null,
  //   start: null,
  //   end: null,
  // });

  const filters = useSelector(selectFilterOptions);
  const dispatch = useDispatch();
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
      <SparesFilterPage />

      {addIsSuccess ? (
        <div className={classes.box__space}>
          {add?.data?.length > 1 ? (
            <Carousel images={add?.data} />
          ) : (
            <Advertisement image={add?.data} />
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
