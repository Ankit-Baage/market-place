import { useQuery } from "@tanstack/react-query";
import { spareColorRequest } from "../../utils/https-request/spares/spareColorRequest";

function useGetSpareColors(colorQuery) {
  // Destructure as an object
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["vrpProductDetail", colorQuery],
    queryFn: () => spareColorRequest(colorQuery), // Wrapped in a function
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!colorQuery
  });
  return { data, isError, isLoading, isSuccess };
}

export default useGetSpareColors;
