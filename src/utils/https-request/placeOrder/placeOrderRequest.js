import { placeOrderUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const placeOrderRequest = async (coupon_code, address_id) => {
  try {
    const url = placeOrderUrl(coupon_code, address_id);
    const response = await axiosInstance.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data.data);

    return response.data; // Only return the relevant data
  } catch (error) {
    throw error;
  }
};
