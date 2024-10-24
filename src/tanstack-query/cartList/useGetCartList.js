import { useQuery } from "@tanstack/react-query";
import { cartListRequest } from "../../utils/https-request/cart/cartListRequest";

function useGetCartList(coupon_code) {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["cartList", coupon_code],  // Include coupon_code in the queryKey
    queryFn: () => cartListRequest(coupon_code),  // Use coupon_code in the queryFn
    refetchOnWindowFocus: false,
    retry: 2,  // Maximum number of retries
    retryDelay: 1000,  // Delay between retries
  });

  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetCartList;
