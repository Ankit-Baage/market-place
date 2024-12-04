import { spareListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const spareListRequest = async (filters, user_id, medium) => {
  try {
    const response = await axiosInstance.get(
      spareListUrl(user_id, medium),

      {
        params: filters,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    throw error; // Re-throw the original error
  }
};
