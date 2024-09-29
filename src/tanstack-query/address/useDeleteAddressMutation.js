import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAddressRequest } from "../../utils/https-request/address/deleteAddressRequest";

const useDeleteAddressMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isLoading, isPending, isSuccess } = useMutation(
    {
      mutationFn: ( id) => deleteAddressRequest(id),
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

export default useDeleteAddressMutation;
