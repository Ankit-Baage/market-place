import React, { useCallback, useState } from "react";
import classes from "./vrpProductDetail.module.css";
import { VrpLotTablePage } from "../../../pages/vrp/VrpLotTablePage";
import { VrpModelTablePage } from "../../../pages/vrp/vrpModelTablePage";
import { VrpBrandTablePage } from "../../../pages/vrp/VrpBrandTablePage";
import { ProductInfoPage } from "../../../pages/vrp/ProductInfoPage";

import useCartListSparesMutation from "../../../tanstack-query/cartList/useCartListSparesMutation";
import { toast } from "react-toastify";

export const VrpProductDetail = ({ requestId, onDownLoad }) => {
  const [productInfo, setProductInfo] = useState({
    category_id: null,
    request_id: requestId,
    cart_status: null,
    wishlist_status: null,
  });
  const { mutateAsync, isLoading, isSuccess, isPending } =
    useCartListSparesMutation();

  const handleDownLoad = () => {
    onDownLoad();
  };

  const handleProductData = useCallback(
    (categoryId, requestId, cart_status, wishlist_status) => {
      if (
        productInfo.category_id !== categoryId ||
        productInfo.request_id !== requestId
      ) {
        setProductInfo({
          category_id: categoryId,
          request_id: requestId,
          cart_status,
          wishlist_status,
        });
        console.log("Product data received from child:", {
          categoryId,
          requestId,
        });
      }
    },
    [productInfo]
  );

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    const data = {
      category_id: productInfo.category_id,
      request_id: productInfo.request_id,
    };

    try {
      const response = await mutateAsync(data);
      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.error(error.response.data.message.displayMessage);
    }
  };

  return (
    <div className={classes.container}>
      <ProductInfoPage
        requestId={requestId}
        onProductData={handleProductData}
      />

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
        <button className={classes.btn__addToCart} onClick={handleAddToCart}>
          {productInfo.cart_status ? "Added" : "Add To Cart"}
        </button>
        <button className={classes.btn__buy}>Buy Now</button>
      </div>
    </div>
  );
};
