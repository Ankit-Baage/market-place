import { laterListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const laterListDeleteRequest = async (item) => {
  const payload = {
    category_id: item.category_id,
    ...(item.category_id !== 5 && {
      master_product_id: item.master_product_id,
      item_id: item.item_id,
    }),
    ...(item.category_id === 5 && { item_id: item.request_id }),
  };

  try {
    const response = await axiosInstance.delete(laterListUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
