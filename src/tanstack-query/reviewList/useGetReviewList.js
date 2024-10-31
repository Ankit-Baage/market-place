import { useQuery } from "@tanstack/react-query";
import { reviewListRequest } from "../../utils/https-request/review/reviewListRequest";

function useGetReviewList({ coupon_code, address_id }) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["reviewList", coupon_code, address_id],
    queryFn: () => reviewListRequest(coupon_code, address_id),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!address_id,
  });

  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetReviewList;
