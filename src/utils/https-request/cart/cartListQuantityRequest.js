import { cartListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cartListQuantityRequest = async ({
  operator,
  category_id,
  master_product_id,
}) => {
  const payload = {
    category_id,
    master_product_id,
  };

  try {
    const response = await axiosInstance.patch(
      `${cartListUrl}/${operator}`,
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
