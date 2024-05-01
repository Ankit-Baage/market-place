import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PFilter } from "../../../components/filters/PFilter";

export const P4filterPage = ({ percentData, onClose, onApply }) => {
  const minDataValue = Math.min(...percentData.map((item) => item.value));
  const maxDataValue = Math.max(...percentData.map((item) => item.value));
  const [startValue, setStartValue] = useState(minDataValue);
  const [endValue, setEndValue] = useState(maxDataValue);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const start = searchParams.get("p4_percent_start");
    const end = searchParams.get("p4_percent_end");

    if (start !== null && end !== null) {
      setStartValue(+start);
      setEndValue(+end);
    } 
  }, [searchParams]);



  const handleSelection = (startValue, endValue) => {
    setSearchParams((params) => {
      params.set("p4_percent_start", startValue);
      params.set("p4_percent_end", endValue);
      return params.toString();
    });
    onApply();
  };

  const handleClear =()=>{
    setSearchParams((params) => {
      params.delete("p4_percent_start", startValue);
      params.delete("p4_percent_end", endValue);
      return params.toString();
    });
    onClose()

  }

  return (
    <PFilter
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
