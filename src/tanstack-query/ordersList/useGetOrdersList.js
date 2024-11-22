import { useQuery } from "@tanstack/react-query";
import { ordersListRequest } from "../../utils/https-request/orders/ordersListRequest";

function useGetOrdersList(status) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["ordersList", status],
    queryFn: () => ordersListRequest(status),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetOrdersList;
