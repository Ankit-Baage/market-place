import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetSelectedAddressDetail from "../../tanstack-query/address/useGetSelectedAddressDetail";
import { AddressForm } from "../../components/address/addressForm/AddressForm";

const newAddressData = {
  name: "",
  mobile_no: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  is_default: 0,
};

export const AddressDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };
  const addressId = params.addressId;
  const {
    data: selectedAddressDetail,
    isLoading: isDetailLoading,
    isSuccess: isDetailSuccess,
  } = useGetSelectedAddressDetail(addressId);

  console.log(isDetailLoading ? "loading..." : selectedAddressDetail);

  const addressData = isDetailLoading
  ? null
  : selectedAddressDetail?.data?.data || newAddressData;

  return isDetailLoading ? (
    <p>Loading...</p>
  ) : (
    <AddressForm
      onNavigate={handleNavigateBack}
      addressData={addressData}
    />
  );
};
