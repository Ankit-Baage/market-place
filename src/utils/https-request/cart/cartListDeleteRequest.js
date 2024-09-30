import { cartListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cartListDeleteRequest = async (data) => {
  // Prepare the payload conditionally based on category_id
  const payload = data.category_id === 5
    ? {
        category_id: data.category_id,
        item_id: data.request_id, // Only include item_id if category_id is 5
      }
    : {
        category_id: data.category_id,
        master_product_id: data.master_product_id, // Include master_product_id for other categories
      };

  try {
    const response = await axiosInstance.delete(cartListUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });

    return response.data; // Return the relevant part of the response
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
