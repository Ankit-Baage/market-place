import { useQuery } from "@tanstack/react-query";
import { orderDetailRequest } from "../../utils/https-request/orderDetail/orderDetailRequest";

function useGetOrderDetail(order_id) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["orderDetail", order_id],
    queryFn: () => orderDetailRequest(order_id),
    enabled: !!order_id, // Only fetch when order_id is available
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });

  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetOrderDetail;
