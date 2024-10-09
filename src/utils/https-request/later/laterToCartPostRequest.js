import {  cartListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const laterToCartPostRequest = async (item) => {
  
  const payload = {
    category_id: item.category_id,
    mode:"save_for_later",
    ...(item.category_id !== 5 && {
      master_product_id: item.master_product_id,
      item_id: item.item_id,
    }),
    ...(item.category_id === 5 && { request_id: item.request_id }),
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
