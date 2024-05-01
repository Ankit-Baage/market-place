import React, { useEffect } from "react";
import useGetVrpProductLotTable from "../../tanstack-query/vrp/useGetVrpProductLotTable";
import { LotTable } from "../../components/table/vrpTable/LotTable";
import { useDispatch } from "react-redux";
import { Spinner } from "../../components/ui/spinner/Spinner";


export const VrpLotTablePage = ({ requestId }) => {
  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    isSuccess,
  } = useGetVrpProductLotTable({ requestId });

  useEffect(() => {
    if (isLoading) {
      // dispatch(openSpinner());
    } else {
      // dispatch(closeSpinner());
    }
  }, [isLoading, dispatch]);

  // Access the data and transform it
  let transformedLotTable = [];
  let tableHeaders = [];

  if (isSuccess) {
    // dispatch(closeSpinner());
    const lotTable = data?.data.data;
    transformedLotTable = lotTable?.map((entry) => ({
      VRP: entry.vrp || 0,
      P1: entry.p1_percentage || 0,
      P2: entry.p2_percentage || 0,
      P3: entry.p3_percentage || 0,
      P4: entry.p4_percentage || 0,
      P5: entry.p5_percentage || 0,
      "Total Qty": entry.total_phones || 0,
    }));

    // Calculate column sums
    const columnSums = transformedLotTable?.reduce((sums, row) => {
      Object.keys(row).forEach((key) => {
        if (key !== "VRP") {
          sums[key] = (sums[key] || 0) + row[key];
        }
      });
      return sums;
    }, {});

    // Add an additional row with column sums
    const sumRow = {
      VRP: "",
      ...columnSums,
    };

    // Add the sum row to the transformedLotTable
    transformedLotTable?.push(sumRow);
    tableHeaders = Object.keys(transformedLotTable[0]);
  }

  // Render LotTable component with the transformed data
  return (
    <>
    {isLoading ? <Spinner /> : <LotTable transformedLotTable={transformedLotTable} tableHeaders={tableHeaders} />}</>

  );
};
