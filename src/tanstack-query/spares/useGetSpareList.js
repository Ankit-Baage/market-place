import { useQuery } from "@tanstack/react-query";
import { spareListRequest } from "../../utils/https-request/spares/spareListRequest";

function useGetSpareList(filters) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["spareList", filters],
    queryFn:()=> spareListRequest(filters),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  console.log(filters)
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetSpareList;
