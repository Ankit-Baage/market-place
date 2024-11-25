import { useQuery } from "@tanstack/react-query";

import { userProfileRequest } from "../../utils/https-request/userProfile/userProfileRequest";

function useGetUserProfile(user_id) {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => userProfileRequest(user_id),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000, // Delay in milliseconds
  });

  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetUserProfile;

