import React, { useState } from "react";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";

import { EmptyCart } from "../../components/cart/emptyCart/EmptyCart";
import useGetCartList from "../../tanstack-query/cart/useGetCartList";
import { SparesCartItem } from "../../components/cart/spareCartItem/SpareCartItem";
import { VrpCartItem } from "../../components/cart/vrpCartItem/VrpCartItem";
import useCartListDeleteItemMutation from "../../tanstack-query/cart/useCartListDeleteMutation";

import classes from "./cartPage.module.css";

export const CartPage = () => {
  const { data, isLoading } = useGetCartList();
  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation();

  const placeholder = "Search...";

  if (isLoading) return <div>Loading...</div>;

  // if (!isSuccess || !data?.data?.data?.length) return <EmptyCart />;
  const handleDelete = async (item) => {
    const cartData = {
      category_id: item.category_id,
      ...(item.category_id !== 5 && {
        master_product_id: item.master_product_id,
      }),
      ...(item.category_id === 5 && { item_id: item.item_id }),
    };

    try {
      await deleteItem(cartData);
      console.log(cartData);
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting the item", error);
    }
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__search}>
        <SearchBar placeholder={placeholder} />
      </div>

      <div className={classes.box__cart}>
        {data.data.data.map((item) =>
          item.category_id === 5 ? (
            <VrpCartItem
              key={item.request_id}
              item={item}
              onRemove={() =>
                handleDelete({
                  category_id: item.category_id,
                  item_id: item.request_id,
                })
              }
            />
          ) : (
            <SparesCartItem
              key={item.id}
              item={item}
              onRemove={() =>
                handleDelete({
                  category_id: item.category_id,
                  master_product_id: item.master_product_id,
                })
              }
            />
          )
        )}
      </div>
      {data.data.data.length === 0 && <EmptyCart />}
    </div>
  );
};
