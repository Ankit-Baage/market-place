import React, { useEffect } from "react";
import useGetVrpProductBrandTable from "../../tanstack-query/vrp/useGetVrpProductBrandTable";
import { BrandTable } from "../../components/table/vrpTable/BrandTable";
import { useDispatch } from "react-redux";

export const VrpBrandTablePage = ({ requestId }) => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetVrpProductBrandTable({
    requestId,
  });
  // console.log(brandTable?.data.data)
  useEffect(() => {
    if (isLoading) {
      // dispatch(openSpinner());
    } else {
      // dispatch(closeSpinner());
    }
  }, [isLoading, dispatch]);

  let transformedBrandTable = [];
  let tableHeaders = [];

  if (isSuccess) {
    // dispatch(closeSpinner());
    const brandTable = data?.data.data;
    transformedBrandTable = brandTable?.map((entry) => ({
      Brand: entry.model || 0,
      "#Phones": entry.phones || 0,
    }));

    tableHeaders = Object.keys(transformedBrandTable[0]);
  }

  return (
    <BrandTable
      transformedBrandTable={transformedBrandTable}
      tableHeaders={tableHeaders}
    />
  );
};
