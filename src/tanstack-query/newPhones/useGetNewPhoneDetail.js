import { useQuery } from "@tanstack/react-query";
import { spareDetailRequest } from "../../utils/https-request/spares/spareDetailRequest";
import { newPhoneDetailRequest } from "../../utils/https-request/newPhone/newPhoneDetailRequest";



function useGetNewPhoneDetail({ requestId, user_id }) { // Destructure as an object
  const {
    data,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["newPhoneDetail", requestId,user_id],
    queryFn: () => newPhoneDetailRequest({ requestId,user_id }), // Wrapped in a function
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!requestId
  });
  return { data, isError, isLoading, isSuccess };
}

export default useGetNewPhoneDetail;
