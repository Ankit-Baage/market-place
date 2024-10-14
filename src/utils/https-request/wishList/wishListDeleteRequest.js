import axiosInstance from "../../axios-middleware/axiosMiddleware";
import { wishListListUrl } from "../../../config/config";

export const wishListListDeleteRequest = async (item) => {
  const payload = {
    category_id: item.category_id,
    ...(item.category_id !== 5 && {
      master_product_id: item.master_product_id,
      item_id: item.item_id,
    }),
    ...(item.category_id === 5 && { item_id: item.request_id }),
  };

  try {
    const response = await axiosInstance.delete(wishListListUrl, {
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
