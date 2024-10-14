import axiosInstance from "../../axios-middleware/axiosMiddleware";
import { wishListListUrl } from "../../../config/config";

export const wishListRequest = async () => {
  try {
    const response = await axiosInstance.get(
      wishListListUrl,

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
