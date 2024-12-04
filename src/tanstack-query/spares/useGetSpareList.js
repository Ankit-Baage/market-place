import { useQuery } from "@tanstack/react-query";
import { spareListRequest } from "../../utils/https-request/spares/spareListRequest";

function useGetSpareList(filters, user_id, medium) {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["spareList", filters, user_id, medium],
    queryFn: () => spareListRequest(filters, user_id, medium),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  console.log(filters);
  return { data, isError, isLoading, isSuccess };
}

export default useGetSpareList;
