import { useQuery } from "@tanstack/react-query";

import { filterSpareOptionRequest } from "../../utils/https-request/spares/filterSpareOptionRequest";

function useGetFilterSpareOption(mode) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["spareFilterOptions", mode],
    queryFn: () => filterSpareOptionRequest(mode),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
    enabled: !!mode,
  });
  console.log(mode)
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetFilterSpareOption;
