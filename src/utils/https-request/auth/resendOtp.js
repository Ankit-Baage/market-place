import { resendOtpUrl } from "../../../config/config";
import axios from "axios";

export const resendOtp = async (mobile_no) => {
  try {
    const response = await axios.post(
      resendOtpUrl,
      { mobile_no },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    console.log("resend");
    return response.data;
  } catch (error) {
    throw error;
  }
};
