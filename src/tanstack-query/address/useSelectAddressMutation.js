import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectAddressRequest } from "../../utils/https-request/address/selectAddressRequest";


const useSelectAddressMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isLoading, isPending, isSuccess } = useMutation(
    {
      mutationFn: (id) => selectAddressRequest(id),
      onSuccess: () => {
        queryClient.invalidateQueries(["addressList"]);
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

export default useSelectAddressMutation;
