import React from "react";
import { useParams } from "react-router-dom";
import { VrpProductDetail } from "../../components/productDetail/vrp/VrpProductDetail";

import useGetVrpProductDetailDownLoad from "../../tanstack-query/vrp/useGetVrpProductDetailDownload";

import { Spinner } from "../../components/ui/spinner/Spinner";

export const VrpDetailPage = () => {
  const params = useParams();

  const requestId = params.requestId;

  const { data, isError, isPending, isSuccess, refetch } =
    useGetVrpProductDetailDownLoad({ requestId });

  const onDownLoad = async () => {
    try {
      await refetch();
      if (data) {
        const contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const blob = new Blob([data], { type: contentType });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `mobiGarage_${requestId}.xlsx`;
        link.click();
      }
    } catch (error) {
      console.error("Error occurred during download:", error);
    }
  };

  return isPending ? (
    <Spinner />
  ) : (
    <VrpProductDetail requestId={requestId} onDownLoad={onDownLoad} />
  );
};
