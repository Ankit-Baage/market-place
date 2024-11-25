import React, { useState } from "react";
import useGetOrdersList from "../../tanstack-query/ordersList/useGetOrdersList";
import classes from "./ordersPage.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { Order } from "../../components/order/Order";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";

const tabs = [
  { id: 1, title: "All" },
  { id: 2, title: "Complete" },
  { id: 3, title: "Pending" },
  { id: 4, title: "Cancelled" },
];

export const OrdersPage = () => {
  const [status, setStatus] = useState();
  const { data, isSuccess } = useGetOrdersList(status);
  const placeholder = "Search for mobile, accessories & more";

  return (
    <div className={classes.box}>
      <SearchBar placeholder={placeholder} />
      <div className={classes.box__tabs}>
        {tabs.map((tab) => (
          <button className={classes.box__tabs__tab} key={tab.id}>
            {tab.title}
          </button>
        ))}
      </div>
      {isSuccess ? (
        <div className={classes.box__orders}>
          {data?.data?.data.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <CartLoader />
      )}
    </div>
  );
};
