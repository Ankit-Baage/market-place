import { advertisementUrl } from "../../../../config/config";
import axiosInstance from "../../../axios-middleware/axiosMiddleware";

export const advertisementRequest = async (filters) => {
  try {
    const response = await axiosInstance.get(advertisementUrl, {
      params: filters,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error; // Re-throw the original error
  }
};
