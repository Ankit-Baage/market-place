import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartListChangeQuantityRequest } from "../../utils/https-request/cart/cartListChangeQuantityRequest";


const useCartListChangeQuantityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => cartListChangeQuantityRequest(data), // Pass the correct data structure
    onSuccess: () => {
      queryClient.invalidateQueries(["cartList"]); // Invalidate the cache of the cart list after a successful quantity update
    },
    onError: (error) => {
      console.error("Error updating quantity:", error);
    },
  });
};

export default useCartListChangeQuantityMutation;
