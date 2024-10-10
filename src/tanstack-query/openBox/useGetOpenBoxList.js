import { useQuery } from "@tanstack/react-query";


import { openBoxListRequest } from "../../utils/https-request/openBox/openBoxListRequest";

function useGetOpenBoxList(filters, user_id) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["openBoxList", filters,user_id],
    queryFn:()=> openBoxListRequest(filters,user_id),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  console.log(filters)
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetOpenBoxList;
