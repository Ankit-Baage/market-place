import { cartListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cartListDeleteRequest = async (data) => {
  // Prepare the payload conditionally based on category_id
  const payload = {
    category_id: data.category_id,
    ...(data.category_id !== 5 && { master_product_id: data.master_product_id }),
    ...(data.category_id === 5 && { item_id: data.item_id }),
  };

  try {
    const response = await axiosInstance.delete(cartListUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      data: payload, // Payload should go in the 'data' property for DELETE requests
    });

    console.log("Response data:", response.data.data);
    return response.data.data; // Return the relevant part of the response
  } catch (error) {
    if (axiosInstance.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error("Server error. Please try again.");
    } else {
      console.error("Unexpected error:", error.message);
      throw error;
    }
  }
};
