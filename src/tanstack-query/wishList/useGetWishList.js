import { useQuery } from "@tanstack/react-query";
import { wishListRequest } from "../../utils/https-request/wishList/wishListRequest";


function useGetWishList() {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["wishList"],
    queryFn: wishListRequest,
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetWishList;
