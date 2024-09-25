import React, { useEffect, useState } from "react";
import spare_Advertisement from "../../assets/spare_Advertisement.png";

import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";
import useGetSpareList from "../../tanstack-query/spares/useGetSpareList";
import { SpareItem } from "../../components/spares/SpareItem";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import classes from "./newPhoneListPage.module.css";
import { SparesFilterPage } from "../spares/filters/sparesFilter/SparesFilterPage";
import { Filters } from "../../components/filter/Filters";
import { FilterModal } from "../../components/filter/FilterModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addActiveFilter,
  setFilterType,
} from "../../store/newPhoneFilter/newPhoneFilterSlice";
import useGetFilterNewPhoneOption from "../../tanstack-query/newPhones/useGetFiltersNewPhoneOption";
import { NewPhoneFiltersPage } from "./newPhoneFilters/NewPhoneFiltersPage";
import useGetNewPhoneList from "../../tanstack-query/newPhones/useGetNewPhoneList";
import { NewPhoneItem } from "../../components/newPhone/NewPhoneItem";

export const NewPhoneListPage = () => {
  const [filters, setFilters] = useState({
    brand: null,
    spare: null,
    model: null,
    start: null,
    end: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.newPhoneFilters.filterType);

  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isSuccess, isLoading, refetch } = useGetNewPhoneList(filters);
  useEffect(() => {
    const newFilters = {
      brand: searchParams.get("brand") || null,
      spare: searchParams.get("spare") || null,
      model: searchParams.get("model") || null,
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
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   sort: itemId,
    // }));
    console.log(itemId);
  };
  const options = [
    {
      id: "apple iphone 14",
      label: "apple iphone 14",
    },
  ];

  return (
    <div className={classes.box}>
      {/* <SparesFilterPage
        onApply={handleApplied}
        onPriceApply={handlePriceApplied}
        onSelection={(itemId) => handleRadioApplied(itemId)}
      /> */}
      <NewPhoneFiltersPage />

      <Advertisement image={spare_Advertisement} />

      <div className={classes.box__space}>
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
