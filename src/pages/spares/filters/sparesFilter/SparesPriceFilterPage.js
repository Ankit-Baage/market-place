import React, { useEffect, useState } from "react";
import { SparePriceModal } from "../../../../components/spares/spareFilters/spareFilterModal/SparePriceModal";
import { useSearchParams } from "react-router-dom";

export const SparesPriceFilterPage = ({
  optionsData,
  onApply,
  onClose,
}) => {
  const radioButtons = optionsData.filter(
    (data) => data.component_type !== "range"
  );
  const sliderData = optionsData.find(
    (data) => data.component_type === "range"
  );
  const minDataValue = sliderData.start;
  const maxDataValue = sliderData.end;
  const [startValue, setStartValue] = useState(minDataValue);
  const [endValue, setEndValue] = useState(maxDataValue);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (start !== null && end !== null) {
      setStartValue(+start);
      setEndValue(+end);
    }
  }, [searchParams]);

  const handleSelection = (startValue, endValue) => {
    onApply(startValue, endValue);
  };

  const handleClear=() =>{
    setSearchParams((params) => {
      params.delete("start");
      params.delete("end");
      return params;
    });
    onClose();
    

  }
  return (
    <SparePriceModal
      radioButtons={radioButtons}
      sliderData={sliderData}
      minDataValue={minDataValue}
      maxDataValue={maxDataValue}
      minValueFromUrl={startValue}
      maxValueFromUrl={endValue}
      onSelection={(startValue, endValue) =>
        handleSelection(startValue, endValue)
      }
      onClose={onClose}
      onClear={handleClear}
    />
  );
};
