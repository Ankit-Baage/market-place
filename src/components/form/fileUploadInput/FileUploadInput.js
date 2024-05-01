import React from 'react';
import classes from "./fileUploadInput.module.css"

export const FileUploadInput = ({ id, label, register, onChange }) => (
  <div className={classes.form__group}>
    <h3 className={classes.form__field__upload__title}>{label}</h3>
    <div className={classes.form__group__upload}>
      <label htmlFor={id} className={classes.form__field__upload__label}>
        <input
          type="file"
          id={id}
          className={classes.form__field__upload}
          {...register(id)}
          onChange={onChange}
        />
      </label>

      <label
        htmlFor={`cam${id}`}
        className={classes.form__field__upload__takePic__label}
      >
        <input
          type="file"
          id={`cam${id}`}
          accept="image/*"
          capture="camera"
          className={classes.form__field__upload__takePic}
          {...register(id)}
        />
      </label>
    </div>
  </div>
);

