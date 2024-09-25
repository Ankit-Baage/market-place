import { cartListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cartListChangeQuantityRequest = async ({ operator, category_id, master_product_id }) => {
  const payload = {
    category_id,
    master_product_id,
  };

  try {
    const response = await axiosInstance.patch(
      `${cartListUrl}/${operator}`,  // Send operator as part of the URL
      payload,  // Send category_id and master_product_id in the request body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response data:", response.data.data);
    return response.data.data;  // Return relevant part of the response
  } catch (error) {
    if (axiosInstance.isAxiosError(error)) {
      // Handle Axios error (network or server-related)
      throw new Error("Server error. Please try again.");
    } else {
      // Handle unexpected non-Axios error
      throw error;
    }
  }
};
