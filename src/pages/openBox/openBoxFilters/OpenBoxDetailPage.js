import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../../components/ui/spinner/Spinner";

import { formatNumber } from "../../../utils/helpers/formatNumber";

import useGetOpenBoxDetail from "../../../tanstack-query/openBox/useGetOpenBoxDetail";
import useGetOpenBoxColors from "../../../tanstack-query/openBox/useGetOpenBoxColors";
import useGetOpenBoxVariant from "../../../tanstack-query/openBox/useGetOpenBoxVariant";
import useCartListSparesMutation from "../../../tanstack-query/cartList/useCartListSparesMutation";
import { OpenBoxDetail } from "../../../components/openBox/openBoxDetail/OpenBoxDetail";
import { toast } from "react-toastify";

const initialState = {
  newPhoneCarouselData: null,
  newPhoneDescription: [],
  prices: {},
  colorQuery: null,
  color: null,
  variantQuery: null,
  variant: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        newPhoneCarouselData: action.payload.newPhoneCarouselData,
        newPhoneDescription: action.payload.newPhoneDescription,
        prices: action.payload.prices,
        colorQuery: action.payload.colorQuery,
        color: action.payload.color,
        variantQuery: action.payload.variantQuery,
        variant: action.payload.variant,
      };
    default:
      return state;
  }
}

export const OpenBoxDetailPage = () => {
 
  const params = useParams();

  const requestId = params.requestId;
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();
  const { data, isError, isPending, isSuccess, refetch } = useGetOpenBoxDetail({
    requestId,
  });

  const handleColorSelect = (color) => {
    // setSelectedColor(color);
    // console.log("Selected color:", color.record_id);
    navigate(`/home/openBox/${color.record_id}`);
  };

  const handleVariantSelect = (requestId) => {
    // setSelectedVariant(requestId);
    console.log("variant :", requestId);

    navigate(`/home/openBox/${requestId}`);
  };

  useEffect(() => {
    if (isSuccess && data) {
      const newPhoneCarouselData = data.data.data.images;
      const newPhoneDescription = [
        { id: 1, desc: data.data.data.description_1 },
        { id: 2, desc: data.data.data.description_2 },
        { id: 3, desc: data.data.data.description_3 },
        { id: 4, desc: data.data.data.description_4 },
      ];

      const colorQuery = {
        sellerId: data.data.data.seller_id,
        brand: data.data.data.brand,
        model: data.data.data.model,
        ram: data.data.data.ram,
        rom: data.data.data.rom,
      };
      const prices = {
        originalPrice: formatNumber(data.data.data.original_price),
        discountedPrice: formatNumber(data.data.data.discounted_price),
        discountPercentage: data.data.data.discount_percentage,
      };
      const color = data.data.data.color;
      const variantQuery = {
        sellerId: data.data.data.seller_id,
        brand: data.data.data.brand,
        model: data.data.data.model,
        color: data.data.data.color,
      };
      const variant = { ram: data.data.data.ram, rom: data.data.data.rom };

      dispatch({
        type: "SET_DATA",
        payload: {
          newPhoneCarouselData,
          newPhoneDescription,
          prices,
          colorQuery,
          color,
          variantQuery,
          variant,
        },
      });
    }
  }, [isSuccess, data]);

  const {
    newPhoneCarouselData,
    colorQuery,
    variantQuery,
    prices,
    newPhoneDescription,
    color,
    variant,
  } = state;

  const { data: newPhoneColors, isSuccess: isNewPhoneSuccess } =
    useGetOpenBoxColors(colorQuery);

  const { data: newPhoneVariant, isSuccess: isOpenBoxVariantSuccess } =
    useGetOpenBoxVariant(variantQuery);

  const { mutateAsync, isLoading } = useCartListSparesMutation();

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    const payload = {
      category_id: data?.data?.data.category_id,
      master_product_id: data?.data?.data.master_product_id,
      item_id: data?.data?.data.id,
    };

    try {
      const response = await mutateAsync(payload);
      // console.log(data)
      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.error(error.response.data.message.displayMessage);
    }
  };

  return !isNewPhoneSuccess ? (
    <Spinner />
  ) : (
    <OpenBoxDetail
      images={newPhoneCarouselData}
      prices={prices}
      colors={newPhoneColors?.data.data}
      color={color}
      partName={data?.data.data.part_name}
      onColorSelect={handleColorSelect}
      descriptions={newPhoneDescription}
      variants={newPhoneVariant?.data.data}
      variant={variant}
      variantId={data?.data.data.id}
      infoSpecs={colorQuery}
      onVariantSelect={(itemId) => handleVariantSelect(itemId)}
      onAddToCart={handleAddToCart}
    />
  );
};
