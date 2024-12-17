import Cookies from "js-cookie";
import {
  cartListGuestUpdateUrl,
  cartListUpdateUrl,
} from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cartListPatchRequest = async (data) => {
  // Prepare the payload conditionally based on category_id
  // Prepare the payload conditionally based on category_id
  const authToken = Cookies.get("authToken");
  const guestId = Cookies.get("guestId");
  const url = authToken ? cartListUpdateUrl : cartListGuestUpdateUrl;
  const payload = {
    category_id: data.category_id,
    ...(data.category_id !== 5 && {
      master_product_id: data.master_product_id,
    }),
    ...(data.category_id !== 5 && { item_id: data.item_id }),
    ...(data.category_id === 5 && { request_id: data.request_id }),
    ...(data.category_id !== 5 && { qty: data.qty }),
    ...(!authToken && guestId && { user_id: guestId }),
  };

  try {
    const response = await axiosInstance.patch(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
