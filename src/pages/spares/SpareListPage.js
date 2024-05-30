import React, { useEffect, useState } from "react";
import { FiltersPage } from "./filters/FiltersPage";
import classes from "./spareListPage.module.css";
import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";
import useGetSpareList from "../../tanstack-query/spares/useGetSpareList";
import { SpareItem } from "../../components/spares/SpareItem";
import { useLocation, useNavigate } from "react-router-dom";
import { SparesFilterPage } from "./filters/sparesFilter/SparesFilterPage";

export const SpareListPage = () => {
  const [spareListdata, setSpareListData] = useState([]);
  const [inFilterMode, setInFilterMode] = useState(false);
  const [filters, setFilters] = useState({
    spare: null,
    brand: null,
    model: null,
    price: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isSuccess, isLoading, refetch } = useGetSpareList(filters);

  const navigateToSpareDetail = (requestId) => {
    navigate(`${requestId}`);
  };

  const handleApplied = (selectedFilters) => {
    const { type, options } = selectedFilters;
    if (
      type === "spare" ||
      type === "brand" ||
      type === "model" ||
      type === "price"
    ) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [type]: options.join(","),
      }));
    }
  };

  return (
    <div className={classes.box}>
      <SparesFilterPage onApply={handleApplied} />
      <Advertisement />

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
