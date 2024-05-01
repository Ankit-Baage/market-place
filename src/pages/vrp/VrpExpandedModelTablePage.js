import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import useGetVrpProductModelTableExpanded from "../../tanstack-query/vrp/useGetProductModelTableExpanded";
import { ExpandedModelTable } from "../../components/table/vrpTable/ExpandedModelTable";

export const VrpExpandedModelTablePage = ({ requestId, onClose }) => {
  const dispatch = useDispatch();
  const [sortConfig, setSortConfig] = useState({ column: null, order: "asc" });
  const [transformedExpandedModelTable, setTransformedExpandedModelTable] =
    useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  const { data, isLoading, isError, isSuccess } =
    useGetVrpProductModelTableExpanded({ requestId });

  useEffect(() => {
    if (isSuccess) {
      // dispatch(closeSpinner());
      const expandedModelTable = data?.data.data;
      const transformedData = expandedModelTable?.map((entry) => ({
        Model: entry.model || 0,
        Grade: entry.grade || 0,
        RateCard: entry.rate_card || 0,
      }));

      // Calculate column sums
      const columnSums = transformedData?.reduce((sums, row) => {
        Object.keys(row).forEach((key) => {
          if (key === "RateCard") {
            sums[key] = (sums[key] || 0) + row[key];
          }
        });
        return sums;
      }, {});
      const sumRow = {
        Model: "",
        Grade: "",
        ...columnSums,
      };

      setTransformedExpandedModelTable([...transformedData, sumRow]);
      setTableHeaders(Object.keys(transformedData[0]));
    }
  }, [isSuccess, data]);

  const handleClose = () => {
    onClose();
  };

  const handleSort = (columnName) => {
    let order = "asc";
    if (sortConfig.column === columnName && sortConfig.order === "asc") {
      order = "desc";
    }
    const newSortConfig = { column: columnName, order: order };
    setSortConfig(newSortConfig);

    // Create a copy of the transformed data
    const sortedTableData = [...transformedExpandedModelTable];

    // Separate the last row from sorting
    const lastRow = sortedTableData.pop(); // Remove the last row

    console.log(lastRow);

    // Sort all data except the last row
    const dataToSort = sortedTableData;
    if (columnName) {
      dataToSort.sort((a, b) => {
        if (a[columnName] < b[columnName]) {
          return order === "asc" ? -1 : 1;
        }
        if (a[columnName] > b[columnName]) {
          return order === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    // Add the last row back to the sorted data
    dataToSort.push(lastRow);

    // Log the sorted data after sorting
    console.log("Sorted Data:", dataToSort);

    // Update the state with the sorted data
    setTransformedExpandedModelTable(dataToSort);
  };

  return (
    <ExpandedModelTable
      transformedExpandedModelTable={transformedExpandedModelTable}
      tableHeaders={tableHeaders}
      onClose={handleClose}
      onSort={handleSort}
    />
  );
};
