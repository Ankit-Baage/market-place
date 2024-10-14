import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import useCartListQuantityMutation from "../../tanstack-query/cartList/useCartListQuantityMutation";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { EmptyCart } from "../../components/cart/EmptyCart";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";

import classes from "./wishListPage.module.css";
import useLaterToCartMutation from "../../tanstack-query/laterList/useLaterToCartMutation";
import { VrpWishListItem } from "../../components/wishList/vrpWishListItem/VrpWishListItem";
import { SparesWishListItem } from "../../components/wishList/sparesWishListItem/SparesWishListItem";
import { NewPhoneWishListItem } from "../../components/wishList/newPhoneWishListItem/NewPhoneWishListItem";
import { OpenBoxWishListItem } from "../../components/wishList/openBoxWishListItem/OpenBoxWishListItem";
import useGetWishList from "../../tanstack-query/wishList/useGetWishList";
import useWishListDeleteItemMutation from "../../tanstack-query/wishList/useWishListDeleteItemMutation";

export const WishListPage = () => {
  const { data, isSuccess, isLoading } = useGetWishList();
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutateAsync: deleteItem } = useWishListDeleteItemMutation();

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
        mode:"wishlist",
        ...(item.category_id !== 5 && {
          master_product_id: item.master_product_id,
          item_id: item.id,
        }),

        ...(item.category_id === 5 && { request_id: item.request_id }),
      };

      try {
        const response = await mutateAsync(data);
        toast.success(response.message.displayMessage);
        console.log(data);
      } catch (error) {
        toast.error(error.response.data.message.displayMessage);
      }
    },
    [mutateAsync]
  );

  const handleRemove = useCallback(
    async (item) => {
      // const { category_id, master_product_id, request_id } = item;

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
        console.log(payload);
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
              <VrpWishListItem
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
              <SparesWishListItem
                key={item.id}
                item={item}
                onRemove={() => {
                  handleRemove(item);
                }}
                onMove={() => {
                  handleMoveToCart(item);
                }}
                isUpdating={isUpdating}
              />
            );
          case 7:
            return (
              <NewPhoneWishListItem
                key={item.id}
                item={item}
                onMove={() => {
                  handleMoveToCart(item);
                }}
                onRemove={() => {
                  handleRemove(item);
                }}
                isUpdating={isUpdating}
              />
            );
          case 8:
            return (
              <OpenBoxWishListItem
                key={item.id}
                item={item}
                onMove={() => {
                  handleMoveToCart(item);
                }}
                onRemove={() => {
                  handleRemove(item);
                }}
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
