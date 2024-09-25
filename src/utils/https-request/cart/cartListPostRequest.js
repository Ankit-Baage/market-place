import { cartListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cartListPostRequest = async (data) => {
  // Check if data contains all required fields and conditionally add fields to payload
  const payload = {
    category_id: data.category_id,
    ...(data.master_product_id !== 5 && { master_product_id: data.master_product_id }),
    ...(data.category_id === 5 && { request_id: data.request_id }), // Add request_id if category_id is 5
    ...(data.category_id !== 5 && { item_id: data.item_id }), // Add item_id if category_id is not 5
  };

  try {
    // Use the payload you've created with conditional fields
    console.log(" :",payload)
    const response = await axiosInstance.post(
      cartListUrl,
      payload, // Use the payload directly here
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Log only if necessary
    console.log("Add to cart response:", response.data.data);

    // Return the actual data from the response
    return response.data.data;
  } catch (error) {
    console.log(" :",payload)
    if (axiosInstance.isAxiosError(error)) {
      // Axios-specific error handling
      console.error("Axios error:", error.message);
      throw new Error("Server error. Please try again.");
    } else {
      // Non-Axios error
      console.error("Unexpected error:", error.message);
      throw error; // Re-throw the original error
    }
  }
};
