import React from "react";

import { convertToAlphabets } from "../../../utils/helpers/convertToAlpha";
import { useNavigate } from "react-router-dom";
import useRequestOtpMutation from "../../../tanstack-query/auth/useRequestOtp";
import { LoginForm } from "../../../components/form/login/LoginForm";
import axios from "axios";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const { mutateAsync, isLoading, isSuccess, isPending } =
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

      navigate(`/otpVerification?${params.toString()}`);
      toast.dismiss(loadingToastId);
      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(error.data.message.displayMessage);

      navigate("/error", { state: { error } });
    }
  };

  return <LoginForm onSubmit={onSubmit} />;
};
