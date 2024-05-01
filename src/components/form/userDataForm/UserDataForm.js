import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import classes from "./userDataForm.module.css";
import { uploadImageRequest } from "../../../utils/https-request/profile/uploadImage";
import { validateGstOrDocs } from "../../../utils/helpers/validateGstOrDocs";
import { useDispatch } from "react-redux";
import { openLoader } from "../../../store/loaderSlice";
import { CustomInput } from "../customInput/CustomInput";
import { FileUploadInput } from "../fileUploadInput/FileUploadInput";
import { Button } from "../../ui/button/Button";

export const UserDataForm = ({ userData, onSubmit, status }) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { register, handleSubmit, formState, control, setValue } = useForm({
    defaultValues: userData,
    validateCriteriaMode: "all",
  });

  const { isValid, isDirty, isTouched } = formState;
  const dispatch = useDispatch();

  const handleFileChange = async (event, field) => {
    const selectedFile = event.target.files[0];

    try {
      const response = await uploadImageRequest(selectedFile);
      const imageUrl = response.data.fileUrl;
      setValue(field, imageUrl);
    } catch (error) {
      console.error(`Upload failed for ${field}:`, error);
    }
  };

  const submitHandler = async (data) => {
    const validationErrors = validateGstOrDocs(data);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors.panValue);
      dispatch(openLoader({ error: validationErrors.panValue }));
      return;
    }
    try {
      // Perform any asynchronous operations here (e.g., API calls)
      await onSubmit(data);

      // If successful, you can perform additional actions or navigate here
    } catch (error) {
      // Handle errors here
      console.error("Submit error:", error);
    }
  };

  return (
    <div className={classes.profile}>
      <div className={classes.profile__head}>
        <h1 className={classes.profile__head__title}>Profile Details</h1>
        <h2 className={classes.profile__head__status}>{status}</h2>
      </div>
      <form
        className={classes.form}
        onSubmit={handleSubmit(submitHandler)}
        noValidate
      >
        <div className={classes.form__controls}>
          <CustomInput
            type="text"
            id="name"
            placeholder="Name"
            register={register}
          />
          <CustomInput
            type="tel"
            id="mobile_no"
            placeholder="Phone Number"
            register={register}
            disabled={true}
          />
          <CustomInput
            type="email"
            id="email"
            placeholder="Email ID"
            register={register}
            pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
            message="Enter a valid email address"
          />

          <h4 className={classes.form__business}>Business Details</h4>
          <CustomInput
            type="text"
            id="gst_number"
            placeholder="GST No."
            register={register}
            pattern={/^[0-9A-Z]{15}$/}
            message="Please provide the correct GST No"
          />

          <div className={classes.form__divider}>
            <div className={classes.form__divider__container}>
              <hr className={classes.form__divider__line} />
              <div className={classes.form__divider__textBox}>
                <div className={classes.form__divider__textBox__space}>
                  <h4 className={classes.form__divider__textBox__text}>Or</h4>
                </div>
              </div>

              <hr className={classes.form__divider__line} />
            </div>
          </div>
          <CustomInput
            type="text"
            id="pan_number"
            placeholder="Pan Number"
            register={register}
            pattern={/^[A-Z]{5}[0-9]{4}[A-Z]$/}
            message="Enter a valid PAN_number card number"
          />

          <FileUploadInput
            id="pan_image_url"
            label="Pan Image Upload"
            register={register}
            onChange={(e) => handleFileChange(e, "pan_image_url")}
          />
          <CustomInput
            type="tel"
            id="aadhar_number"
            placeholder="Aadhar Number"
            register={register}
            pattern={/^\d{12}$/}
            message="Enter a valid 12-digit aadhar_number card number"
          />
          <FileUploadInput
            id="aadhar_image_url"
            label="Aadhar Image Upload"
            register={register}
            onChange={(e) => handleFileChange(e, "aadhar_image_url")}
          />
        </div>

        <Button
          type="submit"
          text="Save"
          disabled={!isValid || !(isDirty || isTouched)}
        />
      </form>
      <DevTool control={control} />
    </div>
  );
};
