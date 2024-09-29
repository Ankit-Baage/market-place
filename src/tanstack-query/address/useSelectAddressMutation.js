import { useMutation } from "@tanstack/react-query";
import { selectAddressRequest } from "../../utils/https-request/address/selectAddressRequest";


const useSelectAddressMutation = () => {
  const { mutateAsync, isError, isLoading, isPending, isSuccess } = useMutation(
    {
      mutationFn: (id) => selectAddressRequest(id),
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
