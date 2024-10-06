import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveToLaterPostRequest } from "../../utils/https-request/cart/moveToLaterPostRequest";

const useMoveToLaterMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError, isLoading, isSuccess } = useMutation({
    mutationFn: (data) => moveToLaterPostRequest(data),
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

export default useMoveToLaterMutation;
