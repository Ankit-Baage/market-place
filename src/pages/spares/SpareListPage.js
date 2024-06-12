import React, { useEffect, useState } from "react";

import spare_Advertisement from "../../assets/spare_Advertisement.png"

import classes from "./spareListPage.module.css";
import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";
import useGetSpareList from "../../tanstack-query/spares/useGetSpareList";
import { SpareItem } from "../../components/spares/SpareItem";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SparesFilterPage } from "./filters/sparesFilter/SparesFilterPage";


export const SpareListPage = () => {
  const [filters, setFilters] = useState({
    brand: null,
    spare: null,
    model: null,
    start: null,
    end:null
  });
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isSuccess, isLoading, refetch } = useGetSpareList(filters);
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

  const handlePriceApplied=(start, end)=>{
    setSearchParams((params) => {
      params.set("start", start);
      params.set("end", end);
      return params.toString();
    });
    setFilters((prevFilters) => ({
      ...prevFilters,
      start:start,
      end:end
    }));
  }
  return (
    <div className={classes.box}>
      <SparesFilterPage onApply={handleApplied} onPriceApply={handlePriceApplied} />
      <Advertisement image={spare_Advertisement}/>

      <div className={classes.box__space}>
        <div className={classes.box__itemList}>
          {data?.map((spareItem, index) => (
            <SpareItem
              key={spareItem.id}
              item={spareItem}
              onClick={navigateToSpareDetail}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
