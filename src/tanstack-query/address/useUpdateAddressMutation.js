import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAddressRequest } from "../../utils/https-request/address/updateAddressRequest";

const useUpdateAddressMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isLoading, isPending, isSuccess } = useMutation(
    {
      mutationFn: (payload, id) => updateAddressRequest(payload,id),
      onSuccess: () => {
        // Invalidate the addresses query to refetch the updated data
        queryClient.invalidateQueries(['addressList']); // Replace 'addresses' with your actual query key
      },
    }
  );

  return {
    mutateAsync,
    isError,
    isLoading,
    isPending,
    isSuccess,
  };
};

export default useUpdateAddressMutation;
