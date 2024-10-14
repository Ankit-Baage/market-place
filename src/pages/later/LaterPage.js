import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useGetLaterList from "../../tanstack-query/laterList/useGetLaterList";

import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { EmptyCart } from "../../components/cart/EmptyCart";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";

import { VrpLaterItem } from "../../components/later/vrpLaterItem/VrpLaterItem";
import { SparesLaterItem } from "../../components/later/sparesLaterItem/SparesLaterItem";
import { NewPhoneLaterItem } from "../../components/later/newPhoneLaterItem/NewPhoneLaterItem";
import { OpenBoxLaterItem } from "../../components/later/openBoxLaterItem/OpenBoxLaterItem";
import classes from "./laterPage.module.css";

import useLaterListDeleteItemMutation from "../../tanstack-query/laterList/useLaterListDeleteMutation";

import useLaterToCartMutation from "../../tanstack-query/laterList/useLaterToCartMutation";

export const LaterPage = () => {
  const [localQuantities, setLocalQuantities] = useState({});
  const { data, isSuccess, isLoading, refetch } = useGetLaterList();
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutateAsync: deleteItem } = useLaterListDeleteItemMutation();
  const {
    mutateAsync,
    isLoading: isMoving,
    isSuccess: isMoved,
    isPending,
  } = useLaterToCartMutation();

  const handleMoveToCart = useCallback(
    async (item) => {
      const data = {
        category_id: item.category_id,
        mode:"save_for_later",
        ...(item.category_id !== 5 && {
          master_product_id: item.master_product_id,
          item_id: item.id,
        }),

        ...(item.category_id === 5 && { request_id: item.request_id }),
      };

      try {
        const response = await mutateAsync(data);
        toast.success(response.message.displayMessage);
        console.log(data)
      } catch (error) {
        toast.error(error.response.data.message.displayMessage);
      }
    },
    [mutateAsync]
  );

  const handleRemove = useCallback(
    async (item) => {

      const payload = {
        category_id: item.category_id,
        ...(item.category_id !== 5 && {
          master_product_id: item.master_product_id,
          item_id: item.id,
        }),
        ...(item.category_id === 5 && { request_id: item.request_id }),
      };
      setIsUpdating(true);

      try {
        const response = await deleteItem(payload);

        toast.success(response.message.displayMessage);
      } catch (error) {
        toast.error(error.response.data.message.displayMessage);
        console.log(error);
      } finally {
        setIsUpdating(false);
      }
    },
    [deleteItem]
  );

  const placeholder = "Search...";

  const content = useMemo(() => {
    if (isLoading) {
      return <CartLoader />;
    }
    if (isSuccess && data?.data?.data.length > 0) {
      return data?.data?.data.map((item) => {
        switch (item.category_id) {
          case 5:
            return (
              <VrpLaterItem
                key={item.request_id}
                item={item}
                isUpdating={isUpdating}
                onRemove={() => {
                  handleRemove(item);
                }}
                onMove={() => {
                  handleMoveToCart(item);
                }}
              />
            );
          case 6:
            return (
              <SparesLaterItem
                key={item.id}
                item={item}
                // onUpdateQuantity={(operator) =>
                //   handleQuantityUpdate(operator, item)
                // }
                onRemove={() => {
                  handleRemove(item);
                }}
                onMove={() => {
                  handleMoveToCart(item);
                }}
                spareQuantity={localQuantities[item.id] || item.quantity}
                isUpdating={isUpdating}
              />
            );
          case 7:
            return (
              <NewPhoneLaterItem
                key={item.id}
                item={item}
                // onUpdateQuantity={(operator) =>
                //   handleQuantityUpdate(operator, item)
                // }
                onMove={() => {
                  handleMoveToCart(item);
                }}
                onRemove={() => {
                  handleRemove(item);
                }}
                newPhoneQuantity={localQuantities[item.id] || item.quantity}
                isUpdating={isUpdating}
              />
            );
          case 8:
            return (
              <OpenBoxLaterItem
                key={item.id}
                item={item}
                // onUpdateQuantity={(operator) =>
                //   handleQuantityUpdate(operator, item)
                // }
                onMove={() => {
                  handleMoveToCart(item);
                }}
                onRemove={() => {
                  handleRemove(item);
                }}
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
  }, [
    isLoading,
    isSuccess,
    data?.data?.data,
    isUpdating,
    localQuantities,
    handleRemove,
    handleMoveToCart,
  ]);

  console.log(data?.data?.data);
  return (
    <div className={classes.box}>
      <SearchBar placeholder={placeholder} />
      <div className={classes.box__cart}>{content}</div>
    </div>
  );
};
