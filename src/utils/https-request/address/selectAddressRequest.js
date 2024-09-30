import { selectAddressUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const selectAddressRequest = async (id) => {
  try {
    const response = await axiosInstance.patch(
      selectAddressUrl(id),

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error; // Re-throw the original error
  }
};
