import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useGetVrpProductDetail from "../../tanstack-query/vrp/useGetVrpProductDetail";
import { ProductInfo } from "../../components/productDetail/vrp/productInfo/ProductInfo";

export const ProductInfoPage = ({ requestId, onProductData }) => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetVrpProductDetail({ requestId });

  // useEffect(() => {
  //   if (isLoading) {
  //     // dispatch(openSpinner());
  //   } else {
  //     // dispatch(closeSpinner());
  //   }
  // }, [isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      console.log("ProductInfoPage :", data);
      const request_id = data?.data?.data?.request_id;
      const category_id = data?.data?.data?.category_id;

      // Call onProductData only if request_id or category_id changes
      if (request_id && category_id) {
        onProductData(category_id, request_id);
      }
    }
  }, [data, isSuccess, onProductData]);

  return <ProductInfo productData={data?.data.data} />;
};
