import React from "react";
import useGetProfileData from "../../../tanstack-query/profile/useGetProfile";
import { UserDataForm } from "../../../components/form/userDataForm/UserDataForm";
import { BrandIdentity } from "../../../components/brandIdentity/BrandIdentity";
import classes from "./userProfile.module.css";
import useUpdateProfileMutation from "../../../tanstack-query/profile/useUpdateProfile";
import axiosInstance from "../../../utils/axios-middleware/axiosMiddleware";
import { useDispatch } from "react-redux";
import { openLoader } from "../../../store/loaderSlice";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const { data, isLoading, isError, refetch } = useGetProfileData();
  const {
    mutateAsync,
    isLoading: isMutating,
    isError: mutationError,
  } = useUpdateProfileMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  if (isError) {
    console.log(isError);
    navigate("/error");
    return null;
  }

  // if (isError || !data) {
  //   return <div>Error loading profile data</div>; // Display an error message
  // }

  const handleSubmit = async (formData) => {
    try {
      const profile = {
        name: formData.name,
        email: formData.email,
        pan_number: formData.pan_number,
        pan_image_url: formData.pan_image_url,
        gst_number: formData.gst_number,
        aadhar_number: formData.aadhar_number,
        aadhar_image_url: formData.aadhar_image_url,
      };
      console.log(profile);

      const response = await mutateAsync(profile);

      // Perform any actions after successful mutation if needed
      console.log("Form data submitted successfully");
      refetch();
    } catch (error) {
      if (axiosInstance.isAxiosError(error)) {
        dispatch(openLoader({ error: error.message }));
        console.error("Axios error in onResend:", error.message);
      } else {
        console.error("Non-Axios error in onSubmit:", error.message);
        dispatch(openLoader({ error: error.message }));
      }
    }
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className={classes.userProfile}>
      <div className={classes.box__brand__wrapper}>
        <button
          className={classes.box__profile__back}
          onClick={handleNavigate}
        />
        <BrandIdentity />
      </div>

      <UserDataForm
        userData={data?.data?.data}
        onSubmit={handleSubmit}
        status={data?.data?.data.profile_status}
      />
    </div>
  );
};
