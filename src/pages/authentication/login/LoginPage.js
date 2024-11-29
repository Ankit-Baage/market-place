import React from "react";

import { convertToAlphabets } from "../../../utils/helpers/convertToAlpha";
import { useNavigate } from "react-router-dom";
import useRequestOtpMutation from "../../../tanstack-query/auth/useRequestOtp";
import { LoginForm } from "../../../components/form/login/LoginForm";
import axios from "axios";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const { mutateAsync } =
    useRequestOtpMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const loadingToastId = toast.loading("sending OTP...");
    try {
      const mobile_no = data.phoneNumber;
      const response = await mutateAsync(mobile_no);

      localStorage.setItem("mobile_no", mobile_no);

      const numToAlpha = convertToAlphabets(mobile_no);
      const params = new URLSearchParams();
      params.set("process", numToAlpha);

      navigate(`otpVerification?${params.toString()}`);
      toast.dismiss(loadingToastId);
      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.log("otp :",error)
      if (error?.customMessage) {
        toast.error(error.customMessage);
        console.log(error)
      } else if (error?.data?.message?.displayMessage) {
        toast.error(error.data.message.displayMessage);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return <LoginForm onSubmit={onSubmit} />;
};
