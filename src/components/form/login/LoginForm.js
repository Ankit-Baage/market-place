import React from "react";
import classes from "./loginForm.module.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "../../ui/button/Button";

export const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState, control, reset } = useForm({
    defaultValues: {
      phoneNumber: "",
    },
  });

  const handleLogin = (data) => {
    onSubmit(data);
    reset();
  };
  const { isValid } = formState;

  return (
    <div className={classes.login}>
      <div className={classes.login__head}>
        <h1 className={classes.login__head__title}>Welcome to</h1>
        <h2 className={classes.login__head__subtitle}>Login</h2>
      </div>
      <form
        className={classes.form}
        onSubmit={handleSubmit(handleLogin)}
        noValidate
      >
        <div className={classes.form__controls}>
          <div className={classes.form__group}>
            <input
              type="tel"
              id="phoneNumber"
              className={classes.form__field}
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: { value: true, message: "Phone number is required" },
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
            />
            <label htmlFor="phoneNumber" className={classes.form__label}>
              Phone Number
            </label>
          </div>
        </div>
        {/* <button
          type="submit"
          className={`${
            (phoneNumber && phoneNumber.length === 10) & isValid
              ? classes.form__btn__enabled
              : classes.form__btn
          }`}
          disabled={!isValid}
        >
          Get OTP
        </button> */}
        <Button text="Get OTP" type="submit" disabled={!isValid}/>
      </form>
      <DevTool control={control} />
    </div>
  );
};
