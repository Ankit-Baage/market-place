import React from "react";

import { convertToAlphabets } from "../../../utils/helpers/convertToAlpha";
import { useNavigate } from "react-router-dom";
import useRequestOtpMutation from "../../../tanstack-query/auth/useRequestOtp";
import { LoginForm } from "../../../components/form/login/LoginForm";
import axios from "axios";

export const LoginPage = () => {
  const { mutateAsync, isLoading, isSuccess, isPending } =
    useRequestOtpMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const mobile_no = data.phoneNumber;
      const response = await mutateAsync(mobile_no);
      localStorage.setItem("mobile_no", mobile_no);

      const numToAlpha = convertToAlphabets(mobile_no);
      const params = new URLSearchParams();
      params.set("process", numToAlpha);

      navigate(`/otpVerification?${params.toString()}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        navigate("/error", { state: { error } });
        console.error("Axios error in onSubmit:", error.message);
      } else {
        console.error("Non-Axios error in onSubmit:", error.message);
        navigate("/error", { state: { error } });
      }
    }
  };

  return <LoginForm onSubmit={onSubmit} />;
};
