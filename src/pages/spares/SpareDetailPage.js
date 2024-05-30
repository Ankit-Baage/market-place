import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import useGetSpareDetail from "../../tanstack-query/spares/useGetSpareDetail";
import { Spinner } from "../../components/ui/spinner/Spinner";
import { SpareDetail } from "../../components/spares/spareDetail/SpareDetail";
import useGetSpareColors from "../../tanstack-query/spares/useGetSpareColors";
import { formatNumber } from "../../utils/helpers/formatNumber";

const initialState = {
  spareCarouselData: null,
  spareDescription: null,
  prices: null,
  colorQuery: null,
  color: null,
  partName:null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        spareCarouselData: action.payload.spareCarouselData,
        spareDescription: action.payload.spareDescription,
        prices: action.payload.prices,
        colorQuery: action.payload.colorQuery,
        color: action.payload.color,
        partName: action.payload.part_name,
      };
    default:
      return state;
  }
}

export const SpareDetailPage = () => {
  const params = useParams();

  const requestId = params.requestId;
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, isError, isPending, isSuccess, refetch } = useGetSpareDetail({
    requestId,
  });

  useEffect(() => {
    
    if (isSuccess && data) {
      const spareCarouselData = data.data.data.images;
      const spareDescription = [
        { id: 1, description: data.data.data.description_1 },
        { id: 2, description: data.data.data.description_2 },
        { id: 3, description: data.data.data.description_3 },
        { id: 4, description: data.data.data.description_4 },
      ];
      const colorQuery = {
        sellerId: data.data.data.seller_id,
        brand: data.data.data.brand,
        model: data.data.data.model,
        part: data.data.data.part,
      };
      const prices = {
        originalPrice: formatNumber(data.data.data.original_price),
        discountedPrice: formatNumber(data.data.data.discounted_price),
        discountPercentage: data.data.data.discount_percentage,
      };
      const color = data.data.data.color;
      const partName = data.data.data.part_name;
      console.log(partName)

      dispatch({
        type: "SET_DATA",
        payload: {
          spareCarouselData,
          spareDescription,
          prices,
          colorQuery,
          color,
          partName
        },
      });
    }
  }, [isSuccess, data]);

  // if (isSuccess && data) {
  //   const spareCarouselData = data?.data.data.images;
  //   const spareDescription = [
  //     { id: 1, description: data?.data.data.description_1 },
  //     { id: 2, description: data?.data.data.description_2 },
  //     { id: 3, description: data?.data.data.description_3 },
  //     { id: 4, description: data?.data.data.description_4 },
  //   ];
  //   const colorQuery = {
  //     sellerId: data.data.data.seller_id,
  //     brand: data.data.data.brand,
  //     model: data.data.data.model,
  //     part: data.data.data.part,
  //   };

  //   const prices = {
  //     originalPrice: data?.data.data.original_price,
  //     discountedPrice: data?.data.data.discounted_price,
  //     discountPercentage: data?.data.data.discount_percentage,
  //   };

  //   const spareColor = data?.data.data.color;
  // }

  // const colorQuery = {
  //   sellerId: data?.data.data.seller_id,
  //   brand: data?.data.data.brand,
  //   model: data?.data.data.model,
  //   part: data?.data.data.part,
  // };

  // const colorQuery = isSuccess
  //   ? {
  //       sellerId: data.data.data.seller_id,
  //       brand: data.data.data.brand,
  //       model: data.data.data.model,
  //       part: data.data.data.part,
  //     }
  //   : null;

  // const prices = {
  //   originalPrice: data?.data.data.original_price,
  //   discountedPrice: data?.data.data.discounted_price,
  //   discountPercentage: data?.data.data.discount_percentage,
  // };

  // const spareColor = data?.data.data.color;
  const { spareCarouselData, colorQuery, prices, spareDescription, color, partName } = state;

  const { data: spareColors, isSuccess: isSpareColorSuccess } =
    useGetSpareColors(colorQuery);

  // console.log(colors?.data.data);
  console.log(spareColors?.data.data);

  return !isSpareColorSuccess ? (
    <Spinner />
  ) : (
    <SpareDetail
      spareData={data}
      images={spareCarouselData}
      prices={prices}
      colors={spareColors?.data.data}
      color={color}
      partName={data?.data.data.part_name}
    />
  );
};
