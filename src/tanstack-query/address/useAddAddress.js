import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAddressRequest } from "../../utils/https-request/address/updateAddressRequest";
import { addAddressRequest } from "../../utils/https-request/address/addAddressRequest";

const useAddAddressMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isLoading, isSuccess } = useMutation({
    mutationFn: (payload) => addAddressRequest(payload),
    onSuccess: () => {
      // Invalidate the addresses query to refetch the updated data
      queryClient.invalidateQueries(['addressList']); // Replace 'addresses' with your actual query key
    },
  });

  return {
    mutateAsync,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useAddAddressMutation;
