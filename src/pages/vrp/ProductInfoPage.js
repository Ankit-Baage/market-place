import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import useGetVrpProductDetail from "../../tanstack-query/vrp/useGetVrpProductDetail";
import { ProductInfo } from "../../components/productDetail/vrp/productInfo/ProductInfo";

export const ProductInfoPage = ({ requestId, onProductData }) => {
  const dispatch = useDispatch();
  const user_id = Cookies.get('user_id')
  const { data, isLoading, isSuccess } = useGetVrpProductDetail({ requestId, user_id });

  

  useEffect(() => {
    if (isSuccess) {
      console.log("ProductInfoPage :", data);
      const request_id = data?.data?.data?.request_id;
      const category_id = data?.data?.data?.category_id;
      const cart_status = data?.data?.data?.cart_status;
      const wishlist_status = data?.data?.data?.wishlist_status;

      if (request_id && category_id) {
        onProductData(category_id, request_id, cart_status, wishlist_status);
      }
    }
  }, [data, isSuccess, onProductData]);

  return <ProductInfo productData={data?.data.data} />;
};
