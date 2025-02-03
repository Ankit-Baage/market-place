import { useMutation } from "@tanstack/react-query";
import { placeOrderRequest } from "../../utils/https-request/placeOrder/placeOrderRequest";

function usePlaceOrderMutation() {
  const mutation = useMutation({
    mutationFn: ({ coupon_code, address_id }) => placeOrderRequest(coupon_code, address_id),
    retry: 1, // Retry the mutation in case of failure
    retryDelay: 1000, // Wait 1 second between retries
  });

  return mutation;
}

export default usePlaceOrderMutation;
