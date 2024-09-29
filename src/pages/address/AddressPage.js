import React, { useEffect, useState } from "react";
import { Address } from "../../components/address/Address";
import useGetAddressList from "../../tanstack-query/address/useGetAddressList";
import classes from "./addressPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import useSelectAddressMutation from "../../tanstack-query/address/useSelectAddressMutation";

export const AddressPage = () => {
  const { data, isLoading, isSuccess } = useGetAddressList();
  const {
    mutateAsync,
    isLoading: selecting,
    isError,
    isSuccess: selectionSuccess,
  } = useSelectAddressMutation();
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const navigate = useNavigate();

  const handleSelectAddress = async (id) => {
    try {
      const response = await mutateAsync(id);
      setSelectedAddressId(id);
      console.log("Address selected successfully:", response);
    } catch (error) {
      console.error("Failed to select address:", error);
    }
  };
  const handleNavigateToDetailPage =(id)=>{
    navigate(`${id}`)
    console.log(id)
  }
  const handleEdit =()=>{
    navigate("add")
  }

  const handleNavigateBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (isSuccess && data?.data?.data) {
      const addressList = data.data.data;
      const defaultAddress = addressList.find(
        (address) => address.is_default === 1
      );
      setSelectedAddressId(defaultAddress?.id || null);
    }
  }, [isSuccess, data]);
  return isSuccess ? (
    <div className={classes.box}>
      <button className={classes.box__btn} onClick={handleNavigateBack} />
      <div className={classes.box__wrapper}>
        <h1 className={classes.box__wrapper__title}>
          Select a delivery address
        </h1>
        {data?.data?.data.map((address) => (
          <Address
            key={address.id}
            address={address}
            selectedAddressId={selectedAddressId}
            onAddressChange={handleSelectAddress}
            onEdit ={()=>handleNavigateToDetailPage(address.id)}
          />
        ))}

        <div className={classes.box__card__new}>
          <button className={classes.box__card__new__btn} onClick={handleEdit}>
            Add a New Address <span className={classes.box__card__new__right} />
          </button>
          <button className={classes.box__card__new__btn} onClick={handleEdit}>
            Add a New Address <span className={classes.box__card__new__right} />
          </button>
          
          <button className={classes.box__card__new__btn}>
            Find a pickup location near you
            <span className={classes.box__card__new__right} />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <CartLoader />
  );
};
