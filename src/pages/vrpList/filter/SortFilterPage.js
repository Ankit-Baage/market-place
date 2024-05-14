import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SortFilter } from "../../../components/vrpFilters/SortFilter";

export const SortFilterPage = ({ sortData, onClose, onApply }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sortParam = searchParams.get("sort");

    if (sortParam !== null) {
      setSelectedItemId(sortParam);
    } else {
      setSelectedItemId(null);
    }
  }, [searchParams]);

  const handleItemSelected = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleSortApply = () => {
    setSearchParams((params) => {
      params.set("sort", selectedItemId);
      return params.toString();
    });

    onClose();
  };
  const handleClear = () => {
    setSearchParams((params) => {
      params.delete("sort");
      return params.toString();
    });
    setSelectedItemId(null);
    onClose();
  };

  const handleClose = () => {
    // Check if a selection has been made
    if (selectedItemId !== null) {
      // Do not remove the sort parameter from URL
      onClose();
    } else {
      setSearchParams((params) => {
        params.delete("sort");
      });
      onClose();
    }
  };

  return (
    <SortFilter
      sortData={sortData}
      onApply={handleSortApply}
      onItemSelected={(itemId) => handleItemSelected(itemId)}
      itemId={selectedItemId}
      onClose={handleClose}
      onClear={handleClear}
    />
  );
};
