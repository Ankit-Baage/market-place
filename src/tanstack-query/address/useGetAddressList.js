import { useQuery } from "@tanstack/react-query";
import { addressRequest } from "../../utils/https-request/address/addressRequest";

function useGetAddressList() {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["addressList"],
    queryFn: addressRequest,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetAddressList;
