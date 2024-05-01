import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useGetVrpProductDetail from "../../tanstack-query/vrp/useGetVrpProductDetail";

import { ProductInfo } from "../../components/productDetail/vrp/productInfo/ProductInfo";

export const ProductInfoPage = ({ requestId }) => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetVrpProductDetail({ requestId });

  useEffect(() => {
    if (isLoading) {
      // dispatch(openSpinner());
      
    } else {
      // dispatch(closeSpinner());
    }
  }, [isLoading, dispatch]);

  let productDataInfo = [];

  if (isSuccess) {
    // dispatch(closeSpinner());
    productDataInfo = data?.data.data;
  }
  return <ProductInfo productData={productDataInfo} />;
};
