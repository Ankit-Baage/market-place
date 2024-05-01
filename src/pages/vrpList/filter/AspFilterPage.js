import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AspFilter } from "../../../components/filters/AspFilter";

export const AspFilterPage = ({ aspData, onClose, onApply }) => {
  const minDataValue = Math.min(...aspData.map((item) => item.value));
  const maxDataValue = Math.max(...aspData.map((item) => item.value));
  const [startValue, setStartValue] = useState(minDataValue);
  const [endValue, setEndValue] = useState(maxDataValue);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const start = searchParams.get("asp_start");
    const end = searchParams.get("asp_end");

    if (start !== null && end !== null) {
      setStartValue(+start);
      setEndValue(+end);
    } 
  }, [searchParams]);



  const handleSelection = (startValue, endValue) => {
    setSearchParams((params) => {
      params.set("asp_start", startValue);
      params.set("asp_end", endValue);
      return params.toString();
    });
    onApply();
  };

  const handleClear =()=>{
    setSearchParams((params) => {
      params.delete("asp_start", startValue);
      params.delete("asp_end", endValue);
      return params.toString();
    });
    onClose()

  }

  return (
    <AspFilter
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
