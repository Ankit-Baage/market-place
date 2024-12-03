import { categoryListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const categoryListRequest = async (
  category,
  user_id,
  medium,
  filters,
) => {
  try {
    const response = await axiosInstance.get(
      categoryListUrl(category, user_id, medium),
      {
        params: filters,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("category :", response?.data?.data)
    return response;
  } catch (error) {
    throw error;
  }
};
