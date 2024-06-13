import React, {  useState } from "react";
// import  { formatNumber } from "../../utils/helpers/formatNumber";
import useGetVrpProductModelTable from "../../tanstack-query/vrp/useGetVrpProductModelTable";
import { ModelTable } from "../../components/table/vrpTable/ModelTable";
import { useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { VrpExpandedModelTablePage } from "../vrp/VrpExpandedModelTablePage";
import { Spinner } from "../../components/ui/spinner/Spinner";
import { formatNumber } from "../../utils/helpers/formatNumber";

export const VrpModelTablePage = ({ requestId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess } = useGetVrpProductModelTable({
    requestId,
  });

  const handleExpand = () => {
    setOpen(true);
    document.body.classList.add("hide-scroll");
  };
  const handleClose = () => {
    setOpen(false);
    document.body.classList.remove("hide-scroll");
  };

  let transformedModelTable = [];
  let tableHeaders = [];

  if (isSuccess) {
    const modelTable = data?.data.data;
    transformedModelTable = modelTable?.map((entry) => ({
      Model: entry.model || 0,
      Grade: entry.grade || 0,
      RateCard: `Rs. ${formatNumber(entry.rate_card)}` || 0,
    }));

    tableHeaders = Object.keys(transformedModelTable[0]);
    console.log(transformedModelTable);
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ModelTable
            transformedModelTable={transformedModelTable}
            tableHeaders={tableHeaders}
            onOpen={handleExpand}
          />
          <AnimatePresence>
            {open && (
              <VrpExpandedModelTablePage
                requestId={requestId}
                onClose={handleClose}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};
