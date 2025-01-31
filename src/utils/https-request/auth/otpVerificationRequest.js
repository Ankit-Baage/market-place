import axios from "axios";
import Cookies from "js-cookie";
import { otpVerificationUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const otpVerificationRequest = async (data) => {
  try {
    console.log(data);
    const response = await axiosInstance.post(
      otpVerificationUrl,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const authToken = response.data.data.auth_token;
    const user_id = response.data.data.profile_data.id;
    const expiryTimestamp = response.data.data.expiry_timestamp;
    console.log("user_id :",user_id);
    Cookies.set("authToken", authToken);
    Cookies.set("user_id", user_id);
    Cookies.set("expiryTimestamp", expiryTimestamp);

    console.log("Cookie set:", {
      authToken: Cookies.get("authToken"),
    });
    console.log(response.data)

    return response.data;
  } catch (error) {
    throw error;
  }
};
