import { requestOtpUrl } from "../../../config/config";
import axios from "axios";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const otpRequested = async (mobile_no) => {
  try {
    const response = await axiosInstance.post(
      requestOtpUrl,
      { mobile_no },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
