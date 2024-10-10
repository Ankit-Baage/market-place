import { useQuery } from "@tanstack/react-query";
import { vrpProductDetailRequest } from "../../utils/https-request/vrp/vrpProductDetailRequest";


function useGetVrpProductDetail({ requestId, user_id }) { // Destructure as an object
  const {
    data,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["vrpProductDetail", requestId, user_id],
    queryFn: () => vrpProductDetailRequest({ requestId, user_id }), // Wrapped in a function
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess };
}

export default useGetVrpProductDetail;
