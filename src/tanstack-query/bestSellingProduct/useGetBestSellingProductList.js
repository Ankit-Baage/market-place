import { useQuery } from "@tanstack/react-query";
import { bestNewPhonesProductRequest, bestOpenBoxProductRequest, bestSparesProductRequest, bestVrpProductRequest } from "../../utils/https-request/bestSellingProduct/bestSellingProductRequest";

export function useGetBestVrpProductList() {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["bestSellingVrp"],
    queryFn: bestVrpProductRequest,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });

  return { data, isError, isLoading, isSuccess };
}
export function useGetBestSparesProductList() {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["bestSellingSpares"],
    queryFn: bestSparesProductRequest,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });

  return { data, isError, isLoading, isSuccess };
}
export function useGetBestNewPhonesProductList() {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["bestSellingNewPhones"],
    queryFn: bestNewPhonesProductRequest,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });

  return { data, isError, isLoading, isSuccess };
}
export function useGetBestOpenBoxProductList() {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["bestSellingOpenBox"],
    queryFn: bestOpenBoxProductRequest,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });

  return { data, isError, isLoading, isSuccess };
}
