import React, { useMemo } from "react";
import classes from "./cartPage.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { EmptyCart } from "../../components/cart/EmptyCart";
import { Cart } from "../../components/cart/Cart";
import { VrpCartItem } from "../../components/cart/vrpCartItem/VrpCartItem";
import useGetCartList from "../../tanstack-query/cartList/useGetCartList";
import { SparesCartItem } from "../../components/cart/sparesCartItem/SparesCartItem";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";

export const CartPage = () => {
  const { data, isSuccess, isLoading, refetch } = useGetCartList();
  const placeholder = "Search...";

  const content = useMemo(() => {
    if (isLoading) {
      return <CartLoader />;
    }
    if (isSuccess && data?.data?.data.length > 1) {
      return data.data.data.map((item) =>
        item.category_id === 5 ? (
          <VrpCartItem key={item.request_id} item={item} />
        ) : (
          <SparesCartItem key={item.id} item={item} />
        )
      );
    }
    return <EmptyCart />;
  }, [isLoading, isSuccess, data]);

  console.log(data?.data?.data);
  return (
    <div className={classes.box}>
      <SearchBar placeholder={placeholder} />
      <div className={classes.box__cart}>
        {/* {data?.data?.data.map((item) =>
          item.category_id === 5 ? (
            <VrpCartItem key={item.request_id} item={item} />
          ) : (
            <SparesCartItem key={item.id} item={item} />
          )
        )}
        {isSuccess && data?.data?.data.length < 1 && <EmptyCart />} */}
        {content}
      </div>
    </div>
  );
};
