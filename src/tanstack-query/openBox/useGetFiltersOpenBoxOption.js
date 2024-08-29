import { useQuery } from "@tanstack/react-query";


import { openBoxFilterOptionRequest } from "../../utils/https-request/openBox/openBoxFilterOptionRequest";

function useGetFilterOpenBoxOption(mode) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["openBoxFilterOptions", mode],
    queryFn: () => openBoxFilterOptionRequest(mode),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!mode,
  });
  console.log(mode)
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetFilterOpenBoxOption;
