import { useQuery } from "@tanstack/react-query";

import { nePhoneListRequest } from "../../utils/https-request/newPhone/newPhoneListRequest";

function useGetNewPhoneList(filters) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["newPhoneList", filters],
    queryFn:()=> nePhoneListRequest(filters),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  console.log(filters)
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetNewPhoneList;
