import React from "react";
import classes from "./customInput.module.css";

export const CustomInput = ({
  id,
  type,
  placeholder,
  register,
  disabled,
  error,
}) => {
  return (
    <div className={classes.form__group}>
      <input
        type={type}
        id={id}
        className={`${classes.form__field} ${error ? classes.error : ""}`}
        placeholder={placeholder}
        {...register}
        disabled={disabled}
      />
      <label htmlFor={id} className={classes.form__label}>
        {placeholder}
      </label>
      {error && <p className={classes.errorText}>{error}</p>}
    </div>
  );
};
