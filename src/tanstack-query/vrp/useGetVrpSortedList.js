import { useQuery } from "@tanstack/react-query";
import { vrpSortedListRequest } from "../../utils/https-request/vrp/vrpSortedListRequest";

function useGetVrpSortedList(filters, user_id) {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["vrpFilteredData", filters, user_id],
    queryFn: ()=>vrpSortedListRequest(filters, user_id),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  console.log(filters)
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetVrpSortedList;
