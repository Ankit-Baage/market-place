import { useQuery } from "@tanstack/react-query";

import { selectedAddressDetailRequest } from "../../utils/https-request/address/selectedAddressDetailRequest";

function useGetSelectedAddressDetail(id) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["addressList", id],
    queryFn:()=> selectedAddressDetailRequest(id),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled:!!id
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetSelectedAddressDetail;
