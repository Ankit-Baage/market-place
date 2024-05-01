import { useMutation } from "@tanstack/react-query";

import { resendOtp } from "../../utils/https-request/auth/resendOtp";

const useResendOtpMutation = () => {
  const { mutateAsync, isError, isLoading, isPending, isSuccess } = useMutation(
    {
      mutationFn: (mobile_no) => resendOtp(mobile_no),
    }
  );

  return {
    mutateAsync,
    isError,
    isLoading,
    isPending,
    isSuccess,
  };
};

export default useResendOtpMutation;
