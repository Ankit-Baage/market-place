import { useQuery } from "@tanstack/react-query";

import { openBoxColorRequest } from "../../utils/https-request/openBox/openBoxColorRequest";

function useGetOpenBoxColors(colorQuery) {
  // Destructure as an object
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["openBoxDetail", colorQuery],
    queryFn: () => openBoxColorRequest(colorQuery),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!colorQuery
  });
  return { data, isError, isLoading, isSuccess };
}

export default useGetOpenBoxColors;
