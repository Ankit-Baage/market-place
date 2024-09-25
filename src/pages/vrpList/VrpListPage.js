import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./vrpListPage.module.css";

import { VrpItem } from "../../components/vrpItem/VrpItem";
import { Spinner } from "../../components/ui/spinner/Spinner";
import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";
import { FilterPage } from "./filter/FilterPage";
import useGetVrpSortedList from "../../tanstack-query/vrp/useGetVrpSortedList";
import useCartListMutation from "../../tanstack-query/cart/useCartListMutation";

export const VrpListPage = () => {
  const [vrpListData, setVrpListData] = useState([]);
  const [inFilterMode, setInFilterMode] = useState(false); // Define open state

  const [filters, setFilters] = useState({
    sort: null,
    apple_per_start: null,
    apple_per_end: null,
    asp_start: null,
    asp_end: null,
    p4_percent_start: null,
    p4_percent_end: null,
  });
  // const { data, isLoading, isError, isSuccess } = useGetVrpList();
  const { data, isSuccess, isLoading, refetch } = useGetVrpSortedList(filters);

  const { mutateAsync, isLoading:isAdding, isSuccess: addSuccess} =
  useCartListMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setVrpListData(data.data.data);
    }
  }, [data, isSuccess]);

  const location = useLocation();

  useEffect(() => {
    if (!inFilterMode) {
      const extractFiltersFromURL = () => {
        const searchParams = new URLSearchParams(location.search);
        const extractedFilters = {
          sort: searchParams.get("sort"),
          apple_per_start: searchParams.get("apple_per_start"),
          apple_per_end: searchParams.get("apple_per_end"),
          asp_start: searchParams.get("asp_start"),
          asp_end: searchParams.get("asp_end"),
          p4_percent_start: searchParams.get("p4_percent_start"),
          p4_percent_end: searchParams.get("p4_percent_end"),
        };
        setFilters(extractedFilters);
      };
      extractFiltersFromURL();
    }
  }, [inFilterMode, location.search]);

  const handleApplied = async (filters) => {
    try {
      setFilters({ ...filters });

      await refetch();
      setVrpListData(data.data.data);
    } catch (err) {
      console.error("Error applying filters:", err);
    }
  };

  const handleRangeFilterApplied = async () => {
    try {
      setFilters({ ...filters });

      await refetch();
      setVrpListData(data.data.data);
    } catch (err) {
      console.error("Error applying filters:", err);
    }
  };

  const navigateToVrpDetail = (requestId) => {
    navigate(`${requestId}`);
  };

  const handleAddToCart = async (event,data) => {
    event.stopPropagation();
    const cartData = {
      category_id: data.category_id,
      request_id: data.request_id,
    };
    try {
      await mutateAsync(cartData);
      console.log("Item added to cart successfully.");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className={classes.box}>
      <FilterPage
        onFilterSort={handleApplied}
        // onFilterRange ={handleRangeFilterApplied}
        setFilterMode={setInFilterMode}
        filters={filters}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={classes.box__space}>
          <Advertisement image="https://mgstorageaccount.blob.core.windows.net/mgbucket/vrp_add190424_2.png" />
          <div className={classes.box__item}>
            {vrpListData?.map((vrpItem, index) => (
              <VrpItem
                key={vrpItem.request_id}
                item={vrpItem}
                index={index}
                totalItems={vrpListData.length}
                onClick={navigateToVrpDetail}
                onAddToCart={(event) => 
                  handleAddToCart(event, {
                    category_id: vrpItem.category_id,
                    request_id: vrpItem.request_id,
                  })
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
