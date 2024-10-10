import { useQuery } from "@tanstack/react-query";

import { openBoxDetailRequest } from "../../utils/https-request/openBox/openBoxDetailRequest";



function useGetOpenBoxDetail({ requestId, user_id }) { // Destructure as an object
  const {
    data,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["openBoxDetail",user_id, requestId],
    queryFn: () => openBoxDetailRequest({ requestId, user_id }), 
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!requestId
  });
  return { data, isError, isLoading, isSuccess };
}

export default useGetOpenBoxDetail;
