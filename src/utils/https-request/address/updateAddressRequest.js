import { addressUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";


export const updateAddressRequest = async (payload) => {
  try {
    const response = await axiosInstance.put(
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
    if (axiosInstance.isAxiosError(error)) {
      // Axios error (e.g., network error, 404 Not Found)
      // console.error("Axios error:", error.message);
      throw new Error("Server error");
    } else {
      // Non-Axios error
      // console.error("Non-Axios error:", error.message);
      throw error; // Re-throw the original error
    }
  }
};
