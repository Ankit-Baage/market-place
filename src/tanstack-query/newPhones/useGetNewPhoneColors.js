import { useQuery } from "@tanstack/react-query";

import { newPhoneColorRequest } from "../../utils/https-request/newPhone/newPhoneColorRequest";

function useGetNewPhoneColors(colorQuery) {
  // Destructure as an object
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["newPhoneDetail", colorQuery],
    queryFn: () => newPhoneColorRequest(colorQuery),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!colorQuery
  });
  return { data, isError, isLoading, isSuccess };
}

export default useGetNewPhoneColors;
