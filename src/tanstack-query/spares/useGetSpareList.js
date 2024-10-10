import { useQuery } from "@tanstack/react-query";
import { spareListRequest } from "../../utils/https-request/spares/spareListRequest";

function useGetSpareList(filters, user_id) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["spareList", filters,user_id],
    queryFn:()=> spareListRequest(filters, user_id),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  console.log(filters)
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetSpareList;
