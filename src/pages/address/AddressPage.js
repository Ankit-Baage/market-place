import React, { useEffect, useState } from "react";
import { Address } from "../../components/address/Address";
import useGetAddressList from "../../tanstack-query/address/useGetAddressList";
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import useSelectAddressMutation from "../../tanstack-query/address/useSelectAddressMutation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { onOpen } from "../../store/confirmationModal/confirmationModalSlice";
import { selectCouponState } from "../../store/coupon/couponSlice";
import {
  selectAddressState,
  setAddressId,
} from "../../store/address/addressSlice";
import { useLocation } from "react-router-dom";
import classes from "./addressPage.module.css";

const getAddressHeading = (pathname) => {
  if (pathname === "/home/cart/address") {
    return "Select Address";
  }
  return null; // No heading change for other paths
};

export const AddressPage = () => {
  const coupon = useSelector(selectCouponState);
  const address = useSelector(selectAddressState);
  const location = useLocation();
  const heading = getAddressHeading(location.pathname);

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isSuccess } = useGetAddressList();
  const {
    mutateAsync,
    isLoading: selecting,

    isSuccess: selectionSuccess,
  } = useSelectAddressMutation();

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectAddress = async (id) => {
    try {
      const response = await mutateAsync(id);
      setSelectedAddressId(id);
      toast.success(response.message.displayMessage);
      dispatch(setSelectedAddressId(id));
    } catch (error) {
      toast.error(error.response.data.message.displayMessage);
    }
  };
  const handleNavigateToDetailPage = (id) => {
    navigate(`${id}`);
    console.log(id);
  };
  const handleEdit = () => {
    navigate("add");
  };

  const handleDeleteModal = (address) => {
    console.log(address);
    if (address) {
      dispatch(
        onOpen({
          id: address.id,
          mobile_no: address.mobile_no,
          address_line1: address.address_line1,
          address_line2: address.address_line2,
          city: address.city,
          state: address.state,
          postal_code: address.postal_code,
          country: address.country,
        })
      );
    }
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleNavigateToReview = () => {
    dispatch(setAddressId({ id: selectedAddressId }));
    navigate("/home/cart/review");
  };
  useEffect(() => {
    if (isSuccess && data?.data?.data) {
      const addressList = data.data.data;
      const defaultAddress = addressList.find(
        (address) => address.is_default === 1
      );
      setSelectedAddressId(defaultAddress?.id || null);
      dispatch(setAddressId(defaultAddress?.id));
    }
  }, [isSuccess, data, dispatch, selectedAddressId]);
  return isSuccess ? (
    <div className={classes.box}>
      <button className={classes.box__btn} onClick={handleNavigateBack} />
      <div className={classes.box__wrapper}>
        <h1 className={classes.box__wrapper__title}>{heading}</h1>
        {data?.data?.data.map((address) => (
          <Address
            key={address.id}
            address={address}
            selectedAddressId={selectedAddressId}
            onAddressChange={handleSelectAddress}
            onEdit={() => handleNavigateToDetailPage(address.id)}
            onOpenDeleteModal={() => handleDeleteModal(address)}
          />
        ))}

        <div className={classes.box__card__new}>
          <button className={classes.box__card__new__btn} onClick={handleEdit}>
            Add a New Address <span className={classes.box__card__new__right} />
          </button>

          <button className={classes.box__card__new__btn}>
            Find a pickup location near you
            <span className={classes.box__card__new__right} />
          </button>
        </div>
        <button
          className={classes.box__btn__review}
          onClick={handleNavigateToReview}
        >
          Review & Checkout
        </button>
      </div>
    </div>
  ) : (
    <CartLoader />
  );
};
