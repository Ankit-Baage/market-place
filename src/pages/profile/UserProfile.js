import React from "react";
import { useNavigate } from "react-router-dom";
import useGetProfileData from "../../tanstack-query/profile/useGetProfile";
import { UserDataForm } from "../../components/form/userDataForm/UserDataForm";
import { BrandIdentity } from "../../components/brandIdentity/BrandIdentity";
import useUpdateProfileMutation from "../../tanstack-query/profile/useUpdateProfile";
import axiosInstance from "../../utils/axios-middleware/axiosMiddleware";
import { useDispatch } from "react-redux";
import { openLoader } from "../../store/loaderSlice";
import classes from "./userProfile.module.css";
import { UserProfileSkeleton } from "../../components/skeletons/userProfileSkeleton/UserProfileSkeleton";
import { ButtonSkeleton } from "../../components/skeletons/buttonSkeleton/ButtonSkeleton";

export const UserProfile = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useGetProfileData();
  const {
    mutateAsync,
    isLoading: isMutating,
    isError: mutationError,
  } = useUpdateProfileMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      <div className={classes.profile}>
        <div className={classes.profile__head}>
          <h1 className={classes.profile__head__title}>Profile Details</h1>
          {isSuccess ? (
            <h2
              className={`${classes.profile__head__status} ${
                data?.data?.data.profile_status === "Pending"
                  ? classes.profile__head__status__pending
                  : data?.data?.data.profile_status === "Incomplete"
                  ? classes.profile__head__status__incomplete
                  : data?.data?.data.profile_status === "Completed"
                  ? classes.profile__head__status__completed
                  : data?.data?.data.profile_status === "Rejected"
                  ? classes.profile__head__status__rejected
                  : ""
              }`}
            >
              {data?.data?.data.profile_status}
            </h2>
          ) : (
            <ButtonSkeleton />
          )}
        </div>
        {isSuccess ? (
          <UserDataForm
            userData={data?.data?.data}
            onSubmit={handleSubmit}
            status={data?.data?.data.profile_status}
          />
        ) : (
          <UserProfileSkeleton />
        )}
      </div>
    </div>
  );
};
