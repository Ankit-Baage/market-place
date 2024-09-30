import { addressUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const addAddressRequest = async (payload) => {
  try {
    const response = await axiosInstance.post(
      addressUrl,
      payload,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error; // Re-throw the original error
  }
};
