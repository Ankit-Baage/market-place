import axiosInstance from "../../axios-middleware/axiosMiddleware";
import { wishListListUrl } from "../../../config/config";

export const addToWishListRequest = async (data) => {
  const payload = {
    category_id: data.category_id,
    ...(data.category_id !== 5 && {
      master_product_id: data.master_product_id,
    }),
    ...(data.category_id !== 5 && { item_id: data.item_id }),
    ...(data.category_id === 5 && { request_id: data.request_id }),
  };
  try {
    const response = await axiosInstance.post(
      wishListListUrl,
      payload,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data.data);

    return response;
  } catch (error) {
    throw error;
  }
};
