import { useQuery } from "@tanstack/react-query";
import { laterListRequest } from "../../utils/https-request/later/laterListRequest";

function useGetLaterList() {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["laterList"],
    queryFn: laterListRequest,
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetLaterList;
