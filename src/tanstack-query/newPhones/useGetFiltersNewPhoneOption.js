import { useQuery } from "@tanstack/react-query";


import { newPhoneFilterOptionRequest } from "../../utils/https-request/newPhone/newPhoneFilterOptionRequest";

function useGetFilterNewPhoneOption(mode) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["newPhoneFilterOptions", mode],
    queryFn: () => newPhoneFilterOptionRequest(mode),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!mode,
  });
  console.log(mode)
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetFilterNewPhoneOption;
