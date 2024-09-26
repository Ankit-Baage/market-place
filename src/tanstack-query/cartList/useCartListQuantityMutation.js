import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartListQuantityRequest } from "../../utils/https-request/cart/cartListQuantityRequest";

const useCartListQuantityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => cartListQuantityRequest(data), 
    onSuccess: (response) => {
      queryClient.invalidateQueries(["cartList"]); // Invalidate the cart list cache
      return response; // Return the response to handle in the component
    },
    onError: (error) => {
      console.log("Error updating quantity:", error);
      throw error; 
    },
  });
};

export default useCartListQuantityMutation;
