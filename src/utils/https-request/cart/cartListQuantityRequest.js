import Cookies from "js-cookie";
import { cartLisGuestUrl, cartListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cartListQuantityRequest = async ({
  operator,
  category_id,
  master_product_id,
}) => {
  const authToken = Cookies.get("authToken");
  const guestId = Cookies.get("guestId");
  const url = authToken ? cartListUrl : cartLisGuestUrl;
  const payload = {
    category_id,
    master_product_id,
  };

  try {
    const response = await axiosInstance.patch(
      `${url}/${operator}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
