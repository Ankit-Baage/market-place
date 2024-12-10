import { useQuery } from "@tanstack/react-query";
import { advertisementRequest } from "../../utils/https-request/address/advertisement/advertisementRequest";

function useGetAdvertisement(filters) {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["advertisement", filters],
    queryFn: () => advertisementRequest(filters), // Pass a function
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000, // Retry delay in milliseconds
  });

  console.log(filters);

  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetAdvertisement;
