import React from 'react';
import classes from "./profileSkeleton.module.css"

export const ProfileSkeleton = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}></div>
    </div>
  )
}
