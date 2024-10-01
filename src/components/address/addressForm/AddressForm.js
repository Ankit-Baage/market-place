import React from "react";
import classes from "./addressForm.module.css";
import { useForm } from "react-hook-form";
import { CustomInput } from "../../form/customInput/CustomInput";
import { Button } from "../../ui/button/Button";
import { CustomSelect } from "../../customSelect/CustomSelect";

export const AddressForm = ({ addressData, onSubmit, onNavigate }) => {
  const { register, handleSubmit, setValue, watch, formState } = useForm({
    defaultValues: {
      name: addressData.name || "",
      mobile_no: addressData.mobile_no || "",
      address_line1: addressData.address_line1 || "",
      address_line2: addressData.address_line2 || "",
      city: addressData.city || "",
      state: addressData.state || "",
      postal_code: addressData.postal_code || "",
      country: addressData.country || "",
      is_default: addressData.is_default === 1, // Convert 1 to true, otherwise false
    },
  });

  const { isValid, isDirty, isTouched } = formState;
  const submitHandler = async (data) => {
    // Send `is_default` as 1 if true, otherwise send 0
    const payload = {
      ...data,
      is_default: data.is_default ? 1 : 0, // Convert true/false to 1/0
    };

    onSubmit(payload);
  };

  const handleSelectionChange = (label, selectedId) => {
    console.log(`${label} selected:`, selectedId);
  };

  // Example options for the select dropdown
  const options = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
  ];
  console.log(addressData);

  return (
    <div className={classes.profile}>
      <div className={classes.profile__head}>
        <button className={classes.profile__backBtn} onClick={onNavigate} />
        <h2 className={classes.profile__head__title}>
          Enter your delivery address
        </h2>
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
            placeholder="Full Name (First and Last name)"
            register={register}
          />
          <CustomInput
            type="tel"
            id="mobile_no"
            placeholder="Phone Number*"
            register={register}
          />
          {/* <CustomInput
            type="email"
            id="email"
            placeholder="Email ID"
            register={register}
            pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
            message="Enter a valid email address"
          /> */}

          <div className={classes.form__location}>
            <h4 className={classes.form__location__text}>
              May be used to assist delivery
            </h4>
            <button type="button" className={classes.form__location__btn}>
              Use my location
            </button>
          </div>

          <CustomInput
            type="text"
            id="address_line1"
            placeholder="Flat, House no, Building, Company,"
            register={register}
            message="Please provide the correct GST No"
          />
          <CustomInput
            type="text"
            id="address_line2"
            placeholder="Area, Street, Sector, Village"
            register={register}
            message="Please provide the correct GST No"
          />
          <CustomInput
            type="text"
            id="landmark"
            placeholder="Landmark"
            register={register}
            message="Please provide the correct landmark"
          />
          <div className={classes.form__city}>
            <div className={classes.form__select}>
              <CustomInput
                type="text"
                id="postal_code"
                placeholder="Pincode"
                register={register}
                pattern={/^\d{6}$/}
                message="Please provide the correct Pincode"
              />
            </div>

            <div className={classes.form__select}>
              {/* <CustomSelect
                optionData={options}
                // selectedId="2"
                label="Town/City"
                register={register} // Registering with react-hook-form
                name="city" // Name for react-hook-form
                onSelection={handleSelectionChange} // Handle selection change
              /> */}
              <CustomInput
                type="text"
                id="city"
                placeholder="Town/City"
                register={register}
                message="Please provide the correct state"
              />
            </div>
          </div>
          {/* <CustomSelect
            optionData={options}
            // selectedId="2"
            label="Select State"
            register={register} // Registering with react-hook-form
            name="state" // Name for react-hook-form
            onSelection={handleSelectionChange} // Handle selection change
          /> */}
          <CustomInput
            type="text"
            id="state"
            placeholder="state"
            register={register}
            message="Please provide the correct Pincode"
          />

          <div>
            <label
              htmlFor="is_default"
              className={classes.box__content__filter__option}
            >
              <input
                id="is_default"
                type="checkbox"
                className={classes.box__content__filter__option__input}
                {...register("is_default")} // Register checkbox
                defaultChecked={addressData?.is_default === 1}
              />
              <span className={`${classes.box__content__filter__labelText} `}>
                Make this my default address
              </span>{" "}
              <span
                className={classes.box__content__filter__option__label}
              ></span>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          text="Save"
          // disabled={!isValid || !(isDirty || isTouched)}
        />
      </form>
    </div>
  );
};
