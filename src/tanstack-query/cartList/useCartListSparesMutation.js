import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartListPostRequest } from "../../utils/https-request/cart/cartListPostRequest";
import { cartListPatchRequest } from "../../utils/https-request/cart/cartListPatchRequest";

const useCartListSparesMutation = () => {
  const queryClient = useQueryClient();

  // Post Mutation
  const { mutateAsync: postCart, isLoading: isPostLoading } = useMutation({
    mutationFn: cartListPostRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["cartList"]);
    },
  });

  // Patch Mutation
  const { mutateAsync: patchCart, isLoading: isPatchLoading } = useMutation({
    mutationFn: cartListPatchRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["cartList"]);
    },
  });

  return {
    postCart,
    patchCart,
    isPostLoading,
    isPatchLoading,
  };
};

export default useCartListSparesMutation;
