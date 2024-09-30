import { cartListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cartListPostRequest = async (data) => {
  // Prepare the payload conditionally based on category_id
  const payload = {
    category_id: data.category_id,
    ...(data.category_id !== 5 && {
      master_product_id: data.master_product_id,
    }),
    ...(data.category_id !== 5 && { item_id: data.item_id }),
    ...(data.category_id === 5 && { request_id: data.request_id }),
  };

  try {
    const response = await axiosInstance.post(cartListUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the relevant part of the response
  } catch (error) {
    throw error;
  }
};
