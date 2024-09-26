import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./vrpListPage.module.css";

import { VrpItem } from "../../components/vrpItem/VrpItem";
import { Spinner } from "../../components/ui/spinner/Spinner";
import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";
import { FilterPage } from "./filter/FilterPage";
import useGetVrpSortedList from "../../tanstack-query/vrp/useGetVrpSortedList";
import axiosInstance from "../../utils/axios-middleware/axiosMiddleware";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "../../components/carousel/Carousel";

const fetchAdvertisements = async () => {
  const response = await axiosInstance.get(
    "https://dev.backend.mobigarage.com/v1/mp/admin/advertisement",
    {
      params: { category: "vrp", page: "listing" },
    }
  );
  return response.data;
};

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
  const {
    data: add,
    error,
    isLoading: addisLoading,
  } = useQuery({
    queryKey: ["advertisements", "vrp", "listing"],
    queryFn: fetchAdvertisements,
  });

  const { data, isSuccess, isLoading, refetch } = useGetVrpSortedList(filters);

  const navigate = useNavigate();

  console.log(add);

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

  return (
    <div className={classes.box}>
      <FilterPage
        onFilterSort={handleApplied}
        setFilterMode={setInFilterMode}
        filters={filters}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={classes.box__space}>
          {add?.data?.length > 1 ? (
            <Carousel images={add?.data} />
          ) : (
            <Advertisement image={add?.data[0].url} />
          )}

          <div className={classes.box__item}>
            {vrpListData?.map((vrpItem, index) => (
              <VrpItem
                key={vrpItem.request_id}
                item={vrpItem}
                index={index}
                totalItems={vrpListData.length}
                onClick={navigateToVrpDetail}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
