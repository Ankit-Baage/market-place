import React from "react";
import { useForm } from "react-hook-form";

import classes from "./userDataForm.module.css";
import { uploadImageRequest } from "../../../utils/https-request/profile/uploadImage";
import { validateGstOrDocs } from "../../../utils/helpers/validateGstOrDocs";
import { useDispatch } from "react-redux";
import { CustomInput } from "../customInput/CustomInput";
import { FileUploadInput } from "../fileUploadInput/FileUploadInput";
import { toast } from "react-toastify";

const validationRules = {
  name: { required: "Name is required" },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Enter a valid email address",
    },
  },
  gst_number: {
    pattern: {
      value: /^[0-9A-Z]{15}$/,
      message: "Please provide a valid GST Number",
    },
  },
  pan_number: {
    pattern: {
      value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
      message: "Enter a valid PAN card number",
    },
  },
  aadhar_number: {
    pattern: {
      value: /^\d{12}$/,
      message: "Enter a valid 12-digit Aadhar card number",
    },
  },
};

export const UserDataForm = ({ userData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: userData,
    mode: "onChange",
  });
  const watchFields = watch([
    "gst_number",
    "pan_number",
    "pan_image",
    "aadhar_number",
    "aadhar_image",
  ]);

  const { errors, isValid, isDirty, isTouched } = formState;
  const dispatch = useDispatch();

  const handleFileChange = async (event, field) => {
    const selectedFile = event.target.files[0];
    const uploadingToastId = toast.success("Uploading...");

    try {
      const response = await uploadImageRequest(selectedFile);
      const imageUrl = response?.data?.fileUrl;
      setValue(field, imageUrl, { shouldValidate: true });
      toast.update(uploadingToastId, {
        render: "Upload successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000, // Automatically close after 3 seconds
      });
    } catch (error) {
      toast.update(uploadingToastId, {
        render: `Upload failed for ${field}: ${
          error.message || "Unknown error"
        }`,
        type: "error",
        isLoading: false,
        autoClose: 5000, // Automatically close after 5 seconds
      });
      console.error(`Upload failed for ${field}:`, error);
    }
  };
  const isCustomValid = () => {
    const {
      gst_number,
      pan_number,
      pan_image_url,
      aadhar_number,
      aadhar_image_url,
    } = watchFields;

    // Group A: Name, email, and GST are required
    const isGroupAValid =
      !!watch("name") && !!watch("email") && !!gst_number?.trim();

    // Group B: Name, email, PAN, PAN Image, Aadhar, and Aadhar Image are required
    const isGroupBValid =
      !!watch("name") &&
      !!watch("email") &&
      !!pan_number?.trim() &&
      !!pan_image_url?.trim() &&
      !!aadhar_number?.trim() &&
      !!aadhar_image_url?.trim();

    // Form is valid if either group is valid
    return isGroupAValid || isGroupBValid;
  };

  const submitHandler = async (data) => {
    const {
      name,
      email,
      gst_number,
      pan_number,
      pan_image_url,
      aadhar_number,
      aadhar_image_url,
    } = data;

    // Group A Validation
    const isGroupAValid = name && email && gst_number;

    // Group B Validation
    const isGroupBValid =
      name &&
      email &&
      pan_number &&
      pan_image_url &&
      aadhar_number &&
      aadhar_image_url;

    // If neither group is valid, show an error
    if (!isGroupAValid && !isGroupBValid) {
      setError("gst_number", {
        type: "custom",
        message: "Provide either GST details or all required documents.",
      });
      setError("pan_number", {
        type: "custom",
        message: "Provide either GST details or all required documents.",
      });
      return; // Stop form submission
    } else {
      // Clear errors if validation passes
      clearErrors("gst_number");
      clearErrors("pan_number");
    }

    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(submitHandler)}
      noValidate
    >
      <div className={classes.form__controls}>
        <CustomInput
          type="text"
          id="name"
          placeholder="Name*"
          register={register("name", validationRules.name)}
          error={errors.name?.message}
        />
        <CustomInput
          type="tel"
          id="mobile_no"
          placeholder="Phone Number"
          register={register("mobile_no")}
          disabled={true}
        />
        <CustomInput
          type="email"
          id="email"
          placeholder="Email ID*"
          register={register("email", validationRules.email)}
          error={errors.email?.message}
        />
        <h4 className={classes.form__business}>Business Details</h4>
        <CustomInput
          type="text"
          id="gst_number"
          placeholder="GST No."
          register={register("gst_number", validationRules.gst_number)}
          error={errors.gst_number?.message}
        />
        <div className={classes.form__divider}>
          <div className={classes.form__divider__container}>
            <hr className={classes.form__divider__line} />
            <div className={classes.form__divider__textBox}>
              <h4 className={classes.form__divider__textBox__text}>Or</h4>
            </div>
            <hr className={classes.form__divider__line} />
          </div>
        </div>
        <CustomInput
          type="text"
          id="pan_number"
          placeholder="Pan Number"
          register={register("pan_number", validationRules.pan_number)}
          error={errors.pan_number?.message}
        />
        <FileUploadInput
          id="pan_image_url"
          label="Pan Image Upload"
          register={register("pan_image_url")}
          onChange={(e) => handleFileChange(e, "pan_image_url")}
        />
        <CustomInput
          type="text"
          id="aadhar_number"
          placeholder="Aadhar Number"
          register={register("aadhar_number", validationRules.aadhar_number)}
          error={errors.aadhar_number?.message}
        />
        <FileUploadInput
          id="aadhar_image_url"
          label="Aadhar Image Upload"
          register={register("aadhar_image_url")}
          onChange={(e) => handleFileChange(e, "aadhar_image_url")}
        />
        <button
          type="submit"
          text="Save"
          // className={
          //   isCustomValid() ? classes.form__btn__enabled : classes.form__btn
          // }
          // disabled={!isCustomValid() }
          className={classes.form__btn__enabled}
        >
          Save
        </button>
      </div>
    </form>
  );
};
