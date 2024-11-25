import React from 'react';
import classes from  "./buttonSkeleton.module.css"

export const ButtonSkeleton = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__info}></div>
    </div>
  )
}
