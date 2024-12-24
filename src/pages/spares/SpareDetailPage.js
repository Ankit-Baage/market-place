import React, { useEffect, useReducer, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCartListQuantityMutation from "../../tanstack-query/cartList/useCartListQuantityMutation";
import useGetSpareDetail from "../../tanstack-query/spares/useGetSpareDetail";
import { Spinner } from "../../components/ui/spinner/Spinner";
import { SpareDetail } from "../../components/spares/spareDetail/SpareDetail";
import useGetSpareColors from "../../tanstack-query/spares/useGetSpareColors";
import { formatNumber } from "../../utils/helpers/formatNumber";
import useCartListSparesMutation from "../../tanstack-query/cartList/useCartListSparesMutation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import useAddToWishListMutation from "../../tanstack-query/wishList/useAddToWishListMutation";

const initialState = {
  spareCarouselData: null,
  spareDescription: null,
  prices: null,
  colorQuery: null,
  color: null,
  partName: null,
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
  const [selectedColor, setSelectedColor] = useState(null);
  const params = useParams();
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");
  const medium = authToken ? "user" : "guest";
  const user_id = authToken ? userId : guestId;

  const requestId = params.requestId;
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const { data, isError, isPending, isSuccess, refetch } = useGetSpareDetail({
    requestId,
    user_id,
    medium,
  });
  const [qty, setQty] = useState(data?.data?.data?.cart_count);
  const { postCart, patchCart } = useCartListSparesMutation();

  const handleQtyChange = (newQty) => {
    setQty(newQty);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    console.log("Selected color:", color.record_id);
    navigate(`/spares/${color.record_id}`);
  };

  useEffect(() => {
    if (isSuccess && data) {
      const spareCarouselData = data.data.data.images;
      const spareDescription = [
        { id: 1, desc: data.data.data.description_1 },
        { id: 2, desc: data.data.data.description_2 },
        { id: 3, desc: data.data.data.description_3 },
        { id: 4, desc: data.data.data.description_4 },
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
        quantity: data.data.data.cart_count,
        onQuantityUpdate: handleQtyChange,
      };
      const color = data.data.data.color;
      const partName = data.data.data.part_name;
      setQty(data.data.data.cart_count || 0);

      dispatch({
        type: "SET_DATA",
        payload: {
          spareCarouselData,
          spareDescription,
          prices,
          colorQuery,
          color,
          partName,
        },
      });
    }
  }, [isSuccess, data]);

  const {
    spareCarouselData,
    colorQuery,
    prices,
    spareDescription,
    color,
    partName,
  } = state;

  const { data: spareColors, isSuccess: isSpareColorSuccess } =
    useGetSpareColors({
      sellerId: colorQuery?.sellerId,
      brand: encodeURIComponent(colorQuery?.brand),
      model: encodeURIComponent(colorQuery?.model),
      part: encodeURIComponent(colorQuery?.part),
    });
  // console.log(colors?.data.data);
  console.log(spareColors?.data.data);

  const { mutateAsync, isLoading } = useCartListSparesMutation();
  const {
    mutateAsync: addToWishList,
    isLoading: isAdding,
    isSuccess: isAdded,
  } = useAddToWishListMutation();

  const handleAddToWishList = async () => {
    const payLoad = {
      category_id: data?.data?.data?.category_id,
      item_id: data?.data?.data?.id,
      master_product_id: data?.data?.data?.master_product_id,
    };

    try {
      const response = await addToWishList(payLoad);
      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.error(error.message.displayMessage);
    }
  };

  const handleAddToCart = useCallback(
    async (event) => {
      event.stopPropagation();
      console.log("data : ", data?.data?.data.cart_count, qty);

      if (qty === data?.data?.data.cart_count) {
        toast.info("Quantity remains unchanged. No action taken.");

        return;
      }

      if (qty <= 0) {
        toast.error("Quantity cannot be zero or negative.");
        return;
      }

      // If the quantity is unchanged, exit early

      const payload = {
        category_id: data?.data?.data.category_id,
        master_product_id: data?.data?.data.master_product_id,
        item_id: data?.data?.data.id,
        qty: qty * 1,
      };

      try {
        if (data?.data?.data.cart_count === 0 && qty > 0) {
          const response = await postCart(payload); // Post (add to cart)
          refetch()
          toast.success(response.message.displayMessage);
        } else if (data?.data?.data.cart_count > 0 && qty > 0) {
          const response = await patchCart(payload);
          refetch();
          toast.success(response.message.displayMessage);
        } else {
          toast.error("Invalid action.");
        }
      } catch (error) {
        console.log(error);
        setQty(data?.data?.data.cart_count);
        toast.error(
          error.response?.data?.message?.displayMessage || "Error occurred."
        );
      }
    },
    [
      qty,
      data?.data?.data.cart_count,
      data?.data?.data.category_id,
      data?.data?.data.master_product_id,
      data?.data?.data.id,
      postCart,
      patchCart,
    ] // Dependencies
  );

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
      onColorSelect={handleColorSelect}
      descriptions={spareDescription}
      onAddToCart={handleAddToCart}
      cart_status={data?.data?.data.cart_status}
      wishlist_status={data?.data?.data.wishlist_status}
      onWishList={handleAddToWishList}
    />
  );
};
