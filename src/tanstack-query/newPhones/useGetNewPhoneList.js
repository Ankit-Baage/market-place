import { useQuery } from "@tanstack/react-query";

import { nePhoneListRequest } from "../../utils/https-request/newPhone/newPhoneListRequest";

function useGetNewPhoneList(filters, user_id, medium) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["newPhoneList", filters,user_id, medium],
    queryFn:()=> nePhoneListRequest(filters,user_id, medium),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  console.log(filters)
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetNewPhoneList;
