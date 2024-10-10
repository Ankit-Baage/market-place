import { openBoxListUrl} from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const openBoxListRequest = async (filters,user_id) => {
  try {
    const response = await axiosInstance.get(
      openBoxListUrl(user_id),

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
