import {newPhoneVariantUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const newPhoneVariantRequest = async ({
  sellerId,
  brand,
  model,
  color
}) => {
  try {
    const response = await axiosInstance.get(
      newPhoneVariantUrl(sellerId, brand, model, color),

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data.data);

    return response;
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
