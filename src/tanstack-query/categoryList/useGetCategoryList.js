import { useQuery } from "@tanstack/react-query";
import { categoryListRequest } from "../../utils/https-request/category/categoryRequest";

function useGetCategoryList(category, user_id, medium, filters) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: [`${category}List`, user_id, medium, filters],
    queryFn: () => categoryListRequest(category, user_id, medium, filters),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  // console.log(filters);
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetCategoryList;
