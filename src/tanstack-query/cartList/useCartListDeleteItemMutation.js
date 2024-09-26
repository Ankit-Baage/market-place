import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartListDeleteRequest } from "../../utils/https-request/cart/cartListDeleteRequest";

const useCartListDeleteItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => cartListDeleteRequest(data), // Ensure data is passed
    onSuccess: () => {
      queryClient.invalidateQueries(["cartList"]); // Invalidate the cache of the cart list after deletion
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });
};

export default useCartListDeleteItemMutation;
