import { useQuery } from "@tanstack/react-query";

import { couponsListRequest } from "../../utils/https-request/coupons/couponsListRequest";
 

function useGetCouponsList() {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["couponsList"],
    queryFn: couponsListRequest,
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetCouponsList;
