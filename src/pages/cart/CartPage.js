import React, { useMemo } from "react";
import classes from "./cartPage.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { EmptyCart } from "../../components/cart/EmptyCart";
import { Cart } from "../../components/cart/Cart";
import { VrpCartItem } from "../../components/cart/vrpCartItem/VrpCartItem";
import useGetCartList from "../../tanstack-query/cartList/useGetCartList";
import { SparesCartItem } from "../../components/cart/sparesCartItem/SparesCartItem";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import { OpenBoxCartItem } from "../../components/cart/openBoxCartItem/OpenBoxCartItem";
import { NewPhoneCartItem } from "../../components/cart/newPhoneCartItem/NewPhoneCartItem";

export const CartPage = () => {
  const { data, isSuccess, isLoading, refetch } = useGetCartList();
  const placeholder = "Search...";

  const content = useMemo(() => {
    if (isLoading) {
      return <CartLoader />;
    }
    if (isSuccess && data?.data?.data.length > 0) {
      return data.data.data.map((item) => {
        switch (item.category_id) {
          case 5:
            return <VrpCartItem key={item.request_id} item={item} />;
          case 6:
            return <SparesCartItem key={item.id} item={item} />;
          case 7:
            return <NewPhoneCartItem key={item.id} item={item} />;
          case 8:
            return <OpenBoxCartItem key={item.id} item={item} />;
          default:
            return null;
        }
      });
    }
    return <EmptyCart />;
  }, [isLoading, isSuccess, data]);

  console.log(data?.data?.data);
  return (
    <div className={classes.box}>
      <SearchBar placeholder={placeholder} />
      <div className={classes.box__cart}>
        {content}
      </div>
    </div>
  );
};
