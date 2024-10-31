import { useQuery } from "@tanstack/react-query";
import { cartListRequest } from "../../utils/https-request/cart/cartListRequest";

function useGetCartList(coupon_code) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["cartList", coupon_code],
    queryFn: () => cartListRequest(coupon_code),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });

  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetCartList;
