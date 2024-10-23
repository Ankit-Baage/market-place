import { couponsListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const couponsListRequest = async () => {
  try {
    const response = await axiosInstance.get(
      couponsListUrl,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data.data);

    return response;
  } catch (error) {
    throw error; // Re-throw the original error
  }
};
