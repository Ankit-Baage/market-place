import React from 'react';
import classes from "./customInput.module.css"

export const CustomInput = ({
  id,
  type,
  placeholder,
  label,
  register,
  disabled,
  pattern,
  message,
}) => {
  return (
    <div className={classes.form__group}>
      <input
        type={type}
        id={id}
        className={classes.form__field}
        placeholder={placeholder}
        {...register(id, {
          pattern: {
            value: pattern,
            message: message,
          },
        })}
        disabled={disabled}
      />
      <label htmlFor={id} className={classes.form__label}>
        {placeholder}
      </label>
    </div>
  );
};
