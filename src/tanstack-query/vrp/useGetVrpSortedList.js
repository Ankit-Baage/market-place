import { useQuery } from "@tanstack/react-query";
import { vrpSortedListRequest } from "../../utils/https-request/vrp/vrpSortedListRequest";

function useGetVrpSortedList(filters, user_id, medium) {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["vrpFilteredData", filters, user_id, medium],
    queryFn: ()=>vrpSortedListRequest(filters, user_id, medium),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  console.log(filters)
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetVrpSortedList;
