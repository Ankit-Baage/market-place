import React from "react";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { convertToNum } from "../../../utils/helpers/convertToNum";
import useOtpVerificationMutation from "../../../tanstack-query/auth/useOtpVerification";
import useResendOtpMutation from "../../../tanstack-query/auth/useResendOtp";
import { closeLoader, openLoader } from "../../../store/loaderSlice";
import { OtpForm } from "../../../components/form/otpForm/OtpForm";
import axios from "axios";
import { toast } from "react-toastify";

export const OtpVerification = () => {
  const { mutateAsync } = useOtpVerificationMutation();

  const {
    mutateAsync: resendOtp,
    isLoading: resendLoading,
    isSuccess: resendSuccess,
  } = useResendOtpMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const params = searchParams.get("process");
  const phoneNumber = convertToNum(params);

  const onResend = async (phoneNumber) => {
    try {
      dispatch(openLoader({ message: "Sending OTP..." }));
      const mobile_no = phoneNumber;
      const response = await resendOtp(mobile_no);
      dispatch(closeLoader());
      console.log(response.status);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(openLoader({ error: error.message }));
        console.error("Axios error in onResend:", error.message);
      } else {
        console.error("Non-Axios error in onSubmit:", error.message);
        dispatch(openLoader({ error: error.message }));
      }
    }
  };

  const onSubmit = async (data) => {
    const loadingToastId = toast.loading("Verifying OTP...");
    try {
      const otp = Object.values(data).join("");
      const mobile_no = phoneNumber;
      const user_id = Cookies.get("guestId");
      const response = await mutateAsync({ mobile_no, otp, user_id });

      localStorage.removeItem("mobile_no");
      toast.dismiss(loadingToastId);
      toast.success(response.message.displayMessage);
      navigate("/");
    } catch (error) {
      toast.dismiss(loadingToastId);
      if (error?.customMessage) {
        toast.error(error.customMessage);
        console.log(error);
      } else if (error?.data?.message?.displayMessage) {
        toast.error(error.data.message.displayMessage);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } 
  };

  return (
    <OtpForm
      onSubmit={onSubmit}
      onResend={onResend}
      phoneNumber={phoneNumber}
    />
  );
};

export async function loader() {}
