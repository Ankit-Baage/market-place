import React, { useCallback, useMemo, useState } from "react";
import classes from "./cartPage.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";

import { VrpCartItem } from "../../components/cart/vrpCartItem/VrpCartItem";
import useGetCartList from "../../tanstack-query/cartList/useGetCartList";
import { SparesCartItem } from "../../components/cart/sparesCartItem/SparesCartItem";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import { OpenBoxCartItem } from "../../components/cart/openBoxCartItem/OpenBoxCartItem";
import { NewPhoneCartItem } from "../../components/cart/newPhoneCartItem/NewPhoneCartItem";
import { toast } from "react-toastify";
import useCartListDeleteItemMutation from "../../tanstack-query/cartList/useCartListDeleteItemMutation";
import useCartListQuantityMutation from "../../tanstack-query/cartList/useCartListQuantityMutation";
import useMoveToLaterMutation from "../../tanstack-query/cartList/useMoveToLaterMutation";
import { EmptyCart } from "../../components/cart/EmptyCart";

export const CartPage = () => {
  const { data, isSuccess, isLoading, refetch } = useGetCartList();
  const [localQuantities, setLocalQuantities] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation();
  const { mutate: updateQuantity } = useCartListQuantityMutation();
  const {
    mutateAsync,
    isLoading: isMoving,
    isSuccess: IsMoved,
    isPending,
  } = useMoveToLaterMutation();

  const handleRemove = useCallback(
    async (item) => {
      const { category_id, master_product_id, request_id } = item;

      const data = {
        category_id,
        ...(category_id === 5 ? { request_id } : { master_product_id }),
      };

      setIsUpdating(true);

      try {
        const response = await deleteItem(data);
        toast.success(response.message.displayMessage);
        console.log(response.message.displayMessage);
      } catch (error) {
        toast.error(error.response.data.message.displayMessage);
      } finally {
        setIsUpdating(false);
      }
    },
    [deleteItem] // Dependencies for useCallback
  );

  const handleQuantityUpdate = useCallback(
    (operator, item) => {
      let currentQuantity = localQuantities[item.id] || item.quantity;

      // Check for decrement case and prevent going below 1
      if (operator === "decrease" && currentQuantity === 1) {
        toast.warn("Quantity cannot be less than 1");
        return;
      }

      const data = {
        operator,
        category_id: item.category_id,
        master_product_id: item.master_product_id,
      };

      // Set the loader for the API call
      setIsUpdating(true);

      // Make the API call to update the quantity
      updateQuantity(data, {
        onSuccess: (response) => {
          // Based on the operator, adjust the local quantity only on success
          const newQuantity =
            operator === "increase" ? currentQuantity + 1 : currentQuantity - 1;

          setLocalQuantities((prev) => ({
            ...prev,
            [item.id]: newQuantity, // Update local state with the new quantity
          }));

          toast.success(response.message.displayMessage);
        },
        onError: (error) => {
          toast.error(error.response.data.message.displayMessage);
        },
        onSettled: () => {
          // Clear the updating state once the API call finishes
          setIsUpdating(false);
        },
      });
    },
    [localQuantities, updateQuantity]
  );

  const handleSaveForLater = useCallback(
    async (item) => {
      const payload = {
        category_id: item.category_id,
        ...(item.category_id !== 5 && {
          master_product_id: item.master_product_id,
        }),
        ...(item.category_id !== 5 && { item_id: item.id }),
        ...(item.category_id === 5 && { request_id: item.request_id }),
      };

      try {
        const response = await mutateAsync(payload);
        toast.success(response.message.displayMessage);
        console.log(item)
      } catch (error) {
        toast.error(error.response.data.message.displayMessage);
      }
    },
    [mutateAsync]
  );

  const placeholder = "Search...";

  const content = useMemo(() => {
    if (isLoading) {
      return <CartLoader />;
    }
    if (isSuccess && data?.data?.data.length > 0) {
      return data.data.data.map((item) => {
        switch (item.category_id) {
          case 5:
            return (
              <VrpCartItem
                key={item.request_id}
                item={item}
                isUpdating={isUpdating}
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={()=>handleSaveForLater(item)}
              />
            );
          case 6:
            return (
              <SparesCartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(operator) =>
                  handleQuantityUpdate(operator, item)
                }
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
                spareQuantity={localQuantities[item.id] || item.quantity}
                isUpdating={isUpdating}
              />
            );
          case 7:
            return (
              <NewPhoneCartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(operator) =>
                  handleQuantityUpdate(operator, item)
                }
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
                newPhoneQuantity={localQuantities[item.id] || item.quantity}
                isUpdating={isUpdating}
              />
            );
          case 8:
            return (
              <OpenBoxCartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(operator) =>
                  handleQuantityUpdate(operator, item)
                }
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
                openBoxQuantity={localQuantities[item.id] || item.quantity}
                isUpdating={isUpdating}
              />
            );
          default:
            return null;
        }
      });
    }
    return <EmptyCart />;
  }, [isLoading, isSuccess, data?.data?.data, isUpdating, localQuantities, handleSaveForLater, handleRemove, handleQuantityUpdate]);

  console.log(data?.data?.data);
  return (
    <div className={classes.box}>
      <SearchBar placeholder={placeholder} />
      <div className={classes.box__cart}>{content}</div>
    </div>
  );
};
