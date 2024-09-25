import { useQuery } from "@tanstack/react-query";
import { cartListRequest } from "../../utils/https-request/cart/cartListRequest";
 

function useGetCartList() {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["cartList"],
    queryFn: cartListRequest,
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetCartList;