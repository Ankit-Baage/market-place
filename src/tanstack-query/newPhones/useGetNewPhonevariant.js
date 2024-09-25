import { useQuery } from "@tanstack/react-query";

import { newPhoneVariantRequest } from "../../utils/https-request/newPhone/newPhoneVariantRequest";

function useGetNewPhoneVariant(variantQuery) {
  // Destructure as an object
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["newPhoneDetail", variantQuery],
    queryFn: () => newPhoneVariantRequest(variantQuery),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!variantQuery
  });
  return { data, isError, isLoading, isSuccess };
}

export default useGetNewPhoneVariant;
