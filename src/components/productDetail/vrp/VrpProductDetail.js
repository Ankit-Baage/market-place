import React from "react";
import classes from "./vrpProductDetail.module.css";
import { VrpLotTablePage } from "../../../pages/vrp/VrpLotTablePage";
import { VrpModelTablePage } from "../../../pages/vrp/vrpModelTablePage";
import { VrpBrandTablePage } from "../../../pages/vrp/VrpBrandTablePage";
import { ProductInfoPage } from "../../../pages/vrp/ProductInfoPage";
import { BasicTable } from "../../table/BasicTable";
import { basicTableData } from "../../table/bsaicTableData";

export const VrpProductDetail = ({ requestId, onDownLoad }) => {
  console.log(requestId);

  const handleDownLoad = () => {
    onDownLoad();
    // console.log(requestId)
  };

  return (
    <div className={classes.container}>
      <ProductInfoPage requestId={requestId} />

      <div className={classes.box__vrpList}>
        <div className={classes.box__details}>
          <h3 className={classes.box__details__title}>Lot Details</h3>
          <button
            className={classes.box__details__download}
            onClick={handleDownLoad}
          ></button>
        </div>
        <div className={classes.box__tables}>
          <VrpLotTablePage requestId={requestId} />
          <VrpModelTablePage requestId={requestId} />
          <VrpBrandTablePage requestId={requestId} />
        </div>
      </div>
      <div className={classes.btn}>
        <button className={classes.btn__addToCart}>Add to Cart(1)</button>
        <button className={classes.btn__buy}>Buy Now</button>
      </div>
    </div>
  );
};
