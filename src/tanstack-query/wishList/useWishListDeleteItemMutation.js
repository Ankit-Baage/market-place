import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishListListDeleteRequest } from "../../utils/https-request/wishList/wishListDeleteRequest";



const useWishListDeleteItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => wishListListDeleteRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishList"]);
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });
};

export default useWishListDeleteItemMutation;
