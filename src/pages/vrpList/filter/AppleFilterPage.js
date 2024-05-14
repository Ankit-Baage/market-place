import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppleFilter } from "../../../components/vrpFilters/AppleFilter";

export const AppleFilterPage = ({ appleData, onClose, onApply }) => {
  const minDataValue = Math.min(...appleData.map((item) => item.value));
  const maxDataValue = Math.max(...appleData.map((item) => item.value));
  const [startValue, setStartValue] = useState(minDataValue);
  const [endValue, setEndValue] = useState(maxDataValue);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const start = searchParams.get("apple_per_start");
    const end = searchParams.get("apple_per_end");

    if (start !== null && end !== null) {
      setStartValue(+start);
      setEndValue(+end);
    } 
  }, [searchParams]);



  const handleSelection = (startValue, endValue) => {
    setSearchParams((params) => {
      params.set("apple_per_start", startValue);
      params.set("apple_per_end", endValue);
      return params.toString();
    });
    onApply();
  };

  const handleClear =()=>{
    setSearchParams((params) => {
      params.delete("apple_per_start", startValue);
      params.delete("apple_per_end", endValue);
      return params.toString();
    });
    onClose()

  }

  return (
    <AppleFilter
      onClose={onClose}
      minDataValue={minDataValue}
      maxDataValue={maxDataValue}
      onSelection={(startValue, endValue) =>
        handleSelection(startValue, endValue)
      }
      minValueFromUrl={startValue}
      maxValueFromUrl={endValue}
      onClear={handleClear}
    />
  );
};
