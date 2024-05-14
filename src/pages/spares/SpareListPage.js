import React, { useState } from "react";
import { FiltersPage } from "./filters/FiltersPage";
import classes from "./spareListPage.module.css";
import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";
import useGetSpareList from "../../tanstack-query/spares/useGetSpareList";
import { SpareItem } from "../../components/spares/SpareItem";

export const SpareListPage = () => {
  const [filters, setFilters] = useState({
    spare: null,
    brand: null,
    model: null,
    price: null,
  });
  // const { data, isLoading, isError, isSuccess } = useGetVrpList();
  const { data, isSuccess, isLoading, refetch } = useGetSpareList(filters);


  console.log(data)
  return (
    <div className={classes.box}>
      <FiltersPage
      // onFilterSort={handleApplied}
      // onFilterRange ={handleRangeFilterApplied}
      // setFilterMode={setInFilterMode}
      // filters={filters}
      />
      <Advertisement />

      <div className={classes.box__space}>
        <div className={classes.box__itemList}>
          {data?.map((spareItem, index) => (
            <SpareItem
              key={spareItem.id}
              item={spareItem}
              // index={index}
              // totalItems={vrpListData.length}
              // onClick={navigateToVrpDetail}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
