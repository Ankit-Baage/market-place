import React, { useEffect, useState } from "react";
import { SpareFilter } from "../../../components/spares/spareFilters/SpareFilter";
import { useSearchParams } from "react-router-dom";
import useGetFilterSpareOption from "../../../tanstack-query/spares/useGetFilterSpareOption";
import { Spinner } from "../../../components/ui/spinner/Spinner";

export const SpareFilterPage = ({ onClose }) => {
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isSuccess, isLoading, refetch } = useGetFilterSpareOption();
  
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    const spareParam = searchParams.get("spare");

    if (spareParam !== null) {
      setSelectedItemIds(spareParam.split(','));
    } else {
      setSelectedItemIds([]);
    }
  }, [searchParams, isSuccess, data]);

  const handleItemSelected = (itemIds) => {
    setSelectedItemIds(itemIds);
    console.log(selectedItemIds)
  };

  const handleSortApply = () => {
    setSearchParams((params) => {
      params.set("spare", selectedItemIds.join(','));
      return params.toString();
    });
    // onClose();
  };

  const handleClear = () => {
    setSearchParams((params) => {
      params.delete("spare");
      return params.toString();
    });
    setSelectedItemIds([]);
    onClose();
  };

  const handleClose = () => {
    if (selectedItemIds.length > 0) {
      onClose();
    } else {
      setSearchParams((params) => {
        params.delete("spare");
      });
      onClose();
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <SpareFilter
      spareData={data?.data?.data}
      onApply={handleSortApply}
      onItemSelected={handleItemSelected}
      selectedItemIds={selectedItemIds}
      onClose={handleClose}
      onClear={handleClear}
    />
  );
};
