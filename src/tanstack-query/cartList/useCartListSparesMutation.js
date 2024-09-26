import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartListPostRequest } from "../../utils/https-request/cart/cartListPostRequest";

const useCartListSparesMutation = () => {
  const queryClient = useQueryClient(); // Access to query client to invalidate cache

  const { mutateAsync, isError, isLoading, isSuccess } = useMutation({
    mutationFn: (data) => cartListPostRequest(data), // Function for adding to cart
    onSuccess: () => {
      // Invalidate 'cartList' query to refetch updated cart data
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

export default useCartListSparesMutation;
