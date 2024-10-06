import { useMutation, useQueryClient } from "@tanstack/react-query";
import { laterListDeleteRequest } from "../../utils/https-request/later/laterListDeleteRequest";


const useLaterListDeleteItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => laterListDeleteRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["laterList"]); // Invalidate the cache of the cart list after deletion
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });
};

export default useLaterListDeleteItemMutation;
