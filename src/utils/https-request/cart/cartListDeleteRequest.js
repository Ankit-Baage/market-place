import Cookies from "js-cookie";
import {  cartLisGuestUrl, cartListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cartListDeleteRequest = async (data) => {
  const authToken = Cookies.get("authToken");
  const url = authToken ? cartListUrl : cartLisGuestUrl;
  const guestId = Cookies.get("guestId");
  const payload =
    data.category_id === 5
      ? {
          category_id: data.category_id,
          item_id: data.request_id,
          ...(!authToken && guestId && { user_id: guestId })
        }
      : {
          category_id: data.category_id,
          item_id: data.id,
          master_product_id: data.master_product_id,
          ...(!authToken && guestId && { user_id: guestId })
        };

  try {
    const response = await axiosInstance.delete(url, {
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
