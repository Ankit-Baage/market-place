import { useMutation, useQueryClient } from "@tanstack/react-query";
import { laterToCartPostRequest } from "../../utils/https-request/later/laterToCartPostRequest";


const useLaterToCartMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError, isLoading, isSuccess } = useMutation({
    mutationFn: (data) => laterToCartPostRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["cartList"]);
    },
  });

  return {
    mutateAsync,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useLaterToCartMutation;
