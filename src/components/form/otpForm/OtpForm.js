import React, { useRef, useState } from "react";
import classes from "./otpForm.module.css";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button/Button";

export const OtpForm = ({ onSubmit, onResend, phoneNumber }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
  });
  const { isValid } = formState;
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (index, value) => {
    setValue(`otp${index + 1}`, value);

    if (index < 3 && value.length === 1) {
      inputRefs[index + 1].current.focus();
    }

    const areAnyFieldsEmpty = Object.values(getValues()).some((val) => !val);

    setAllFieldsFilled(!areAnyFieldsEmpty);

    if (index === 3) {
      trigger();
    }
  };

  const handleOtp = (data) => {
    console.log(data);
    onSubmit(data);
    reset();
  };

  const handleResend = () => {
    onResend(phoneNumber);
  };

  return (
    <div className={classes.otp}>
      <div className={classes.otp__head}>
        <h1 className={classes.otp__head__title}>OTP Verification</h1>
        <span className={classes.otp__head__subtitle}>
          <h2 className={classes.otp__head__subtitle__head}>
            We’ve sent an OTP to{" "}
          </h2>
          <h2 className={classes.otp__head__subtitle__number}>{phoneNumber}</h2>
        </span>
      </div>
      <form className={classes.otp__form} onSubmit={handleSubmit(handleOtp)}>
        <div className={classes.otp__form__group}>
          {[1, 2, 3, 4].map((index) => (
            <label key={index} className={classes.otp__form__label}>
              <input
                type="number"
                className={classes.otp__form__field}
                {...register(`otp${index}`, { required: true })}
                minLength={1}
                maxLength={1}
                ref={inputRefs[index - 1]}
                onChange={(e) => handleOtpChange(index - 1, e.target.value)}
                onKeyDown={(e) => {
                  // Allow numeric characters and Backspace
                  const isNumeric = /^[0-9]$/.test(e.key);
                  const isBackspace = e.key === "Backspace";

                  if (!isNumeric && !isBackspace) {
                    e.preventDefault();
                  }
                }}
              />
            </label>
          ))}
        </div>

        {/* <button
          type="submit"
          className={`${
            !allFieldsFilled || !isValid
              ? classes.otp__form__btn
              : classes.otp__form__btn__enabled
          }`}
        >
          Verify
        </button> */}
        <Button text="Verify" type="submit" disabled={!allFieldsFilled || !isValid}/>
      </form>
      <button className={classes.otp__form__btn__resend} onClick={handleResend}>
        Resend OTP
      </button>
    </div>
  );
};
