import { useQuery } from "@tanstack/react-query";
import { spareDetailRequest } from "../../utils/https-request/spares/spareDetailRequest";



function useGetSpareDetail({ requestId }) { // Destructure as an object
  const {
    data,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["vrpProductDetail", requestId],
    queryFn: () => spareDetailRequest({ requestId }), // Wrapped in a function
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess };
}

export default useGetSpareDetail;
