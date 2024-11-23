import { useQuery } from "@tanstack/react-query";
import { cartListRequest } from "../../utils/https-request/cart/cartListRequest";

function useGetCartList(coupon_code, guestId) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["cartList", coupon_code,guestId],
    queryFn: () => cartListRequest(coupon_code, guestId),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });

  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetCartList;
