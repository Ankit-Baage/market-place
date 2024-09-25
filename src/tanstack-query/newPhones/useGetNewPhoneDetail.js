import { useQuery } from "@tanstack/react-query";
import { spareDetailRequest } from "../../utils/https-request/spares/spareDetailRequest";
import { newPhoneDetailRequest } from "../../utils/https-request/newPhone/newPhoneDetailRequest";



function useGetNewPhoneDetail({ requestId }) { // Destructure as an object
  const {
    data,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["newPhoneDetail", requestId],
    queryFn: () => newPhoneDetailRequest({ requestId }), // Wrapped in a function
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!requestId
  });
  return { data, isError, isLoading, isSuccess };
}

export default useGetNewPhoneDetail;
