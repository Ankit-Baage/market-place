import { placeOrderUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const placeOrderRequest = async (coupon_code,address_id, ) => {
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
    if (axiosInstance.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error("Server error. Please try again later.");
    } else {
      console.error("Non-Axios error:", error.message);
      throw error; // Re-throw original error
    }
  }
};
