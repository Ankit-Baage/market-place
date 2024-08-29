import { useQuery } from "@tanstack/react-query";

import { openBoxVariantRequest } from "../../utils/https-request/openBox/openBoxVariantRequest";

function useGetOpenBoxVariant(variantQuery) {
  // Destructure as an object
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["openBoxDetail", variantQuery],
    queryFn: () => openBoxVariantRequest(variantQuery),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !!variantQuery
  });
  return { data, isError, isLoading, isSuccess };
}

export default useGetOpenBoxVariant;
