import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addToWishListRequest } from "../../utils/https-request/wishList/addToWishListRequest";


const useAddToWishListMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError, isLoading, isSuccess } = useMutation({
    mutationFn: (data) => addToWishListRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishListed"]);
    },
  });

  return {
    mutateAsync,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useAddToWishListMutation;
