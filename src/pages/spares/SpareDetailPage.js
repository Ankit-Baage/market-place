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
  // const [localQuantities, setLocalQuantities] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const { data, isError, isPending, isSuccess, refetch } = useGetSpareDetail({
    requestId,
    user_id,
    medium,
  });
  const [qty, setQty] = useState(data?.data?.data?.cart_count);
  // const { mutate: updateQuantity } = useCartListQuantityMutation();
  const { postCart, patchCart } = useCartListSparesMutation();
  const handleQtyChange = (newQty) => {
    setQty(newQty);
    console.log("Grandparent updated Quantity:", newQty);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    console.log("Selected color:", color.record_id);
    navigate(`/spares/${color.record_id}`);
  };

  // const handleQuantityUpdate = useCallback(
  //   (operator, item = data?.data?.data) => {
  //     let currentQuantity = localQuantities[item.id] || item.quantity;

  //     // Check for decrement case and prevent going below 1
  //     if (operator === "decrease" && currentQuantity === 1) {
  //       toast.warn("Quantity cannot be less than 1");
  //       return;
  //     }

  //     const data = {
  //       operator,
  //       category_id: item.category_id,
  //       master_product_id: item.master_product_id,
  //     };

  //     // Set the loader for the API call
  //     setIsUpdating(true);

  //     // Make the API call to update the quantity
  //     updateQuantity(data, {
  //       onSuccess: (response) => {
  //         // Based on the operator, adjust the local quantity only on success
  //         const newQuantity =
  //           operator === "increase" ? currentQuantity + 1 : currentQuantity - 1;

  //         setLocalQuantities((prev) => ({
  //           ...prev,
  //           [item.id]: newQuantity, // Update local state with the new quantity
  //         }));

  //         toast.success(response.message.displayMessage);
  //       },
  //       onError: (error) => {
  //         toast.error(error.response.data.message.displayMessage);
  //       },
  //       onSettled: () => {
  //         // Clear the updating state once the API call finishes
  //         setIsUpdating(false);
  //       },
  //     });
  //   },
  //   [data?.data?.data, localQuantities, updateQuantity]
  // );

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
      console.log(partName);

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

      // If the quantity is unchanged, exit early
      if (qty === data?.data?.data.cart_count) {
        toast.info("Quantity remains unchanged. No action taken.");
        return;
      }

      // Check if the quantity is zero or negative
      if (qty <= 0) {
        toast.error("Quantity cannot be zero or negative.");
        return;
      }

      const payload = {
        category_id: data?.data?.data.category_id,
        master_product_id: data?.data?.data.master_product_id,
        item_id: data?.data?.data.id,
        qty: qty * 1, // Ensure it's a number
      };

      try {
        if (data?.data?.data.cart_count === 0 && qty > 0) {
          // If the previous quantity was 0 (even if it came from the backend) and the user updates it to something greater than 0, post (add to cart)
          const response = await postCart(payload); // Post (add to cart)
          toast.success(response.message.displayMessage);
        } else if (data?.data?.data.cart_count > 0 && qty > 0) {
          // If the quantity is being updated but is non-zero, patch (update quantity)
          const response = await patchCart(payload); // Patch (update quantity)
          toast.success(response.message.displayMessage);
        } else {
          // Handle edge case where qty is 0 or invalid action
          toast.error("Invalid action.");
        }
      } catch (error) {
        // Rollback to the last valid quantity if error occurs
        console.log(error)
        setQty(data?.data?.data.cart_count);
        toast.error(
          error.response?.data?.message?.displayMessage || "Error occurred."
        );
      }
    },
    [qty, data, mutateAsync] // Dependencies
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
