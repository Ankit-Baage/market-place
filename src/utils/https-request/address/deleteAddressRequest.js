import axiosInstance from "../../axios-middleware/axiosMiddleware";
import { selectedAddressDetailUrl } from "../../../config/config";

export const deleteAddressRequest = async (id) => {
  try {
    const response = await axiosInstance.delete(
      selectedAddressDetailUrl(id),

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response.data.data)

    return response.data;
  } catch (error) {
    throw error; // Re-throw the original error
  }
};
