import React from 'react';
import classes from "./advertisement.module.css"

export const Advertisement = () => {
  return (
    <div className={classes.box}>
      <img src="https://mgstorageaccount.blob.core.windows.net/mgbucket/vrp_box.png" alt='advertisement' className={classes.box__img}/>
    </div>
  )
}
