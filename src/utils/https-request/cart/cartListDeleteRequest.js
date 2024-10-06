import { cartListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cartListDeleteRequest = async (data) => {
  const payload =
    data.category_id === 5
      ? {
          category_id: data.category_id,
          item_id: data.request_id,
        }
      : {
          category_id: data.category_id,
          item_id: data.id,
          master_product_id: data.master_product_id,
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
    throw error;
  }
};
