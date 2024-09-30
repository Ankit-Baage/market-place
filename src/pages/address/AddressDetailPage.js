import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetSelectedAddressDetail from "../../tanstack-query/address/useGetSelectedAddressDetail";
import { AddressForm } from "../../components/address/addressForm/AddressForm";
import useUpdateAddressMutation from "../../tanstack-query/address/useUpdateAddressMutation";
import { toast } from "react-toastify";
import useAddAddressMutation from "../../tanstack-query/address/useAddAddress";
import useDeleteAddressMutation from "../../tanstack-query/address/useDeleteAddressMutation";

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
  const addressId = params.addressId;
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const {
    data: selectedAddressDetail,
    isLoading: isDetailLoading,
    isSuccess: isDetailSuccess,
  } = useGetSelectedAddressDetail(addressId);

  const { mutateAsync, isLoading, isError, isSuccess } =
    useUpdateAddressMutation();
  const {
    mutateAsync: addMutation,
    isLoading: isAdding,
    isSuccess: isAddSuccess,
  } = useAddAddressMutation();
  

  const handleSubmit = async (payload) => {
    const loadingToastId = toast.loading(
      addressId ? "Updating Address..." : "Adding Address..."
    );
    const data = { ...payload };

    try {
      let response;

      if (addressId) {
        // If addressId exists, update the address
        data.id = addressId;
        response = await mutateAsync(data);
      } else {
        // If no addressId, add a new address
        response = await addMutation({...data, country:"India"});
      }

      navigate(-1);
      toast.dismiss(loadingToastId);
      toast.success(response.data.message.displayMessage);
    } catch (error) {
      console.log("Failed to process address:", error);
      toast.dismiss(loadingToastId);
      toast.error(
        error.response?.data?.message?.displayMessage || "An error occurred"
      );
    }
  };
  console.log(addressId);

  const addressData = isDetailLoading
    ? null
    : selectedAddressDetail?.data?.data || newAddressData;

  return isDetailLoading ? (
    <p>Loading...</p>
  ) : (
    <AddressForm
      onNavigate={handleNavigateBack}
      addressData={addressData}
      onSubmit={handleSubmit}
    />
  );
};