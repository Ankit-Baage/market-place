import React, { useEffect, useState } from "react";

import spare_Advertisement from "../../assets/spare_Advertisement.png";

import classes from "./spareListPage.module.css";
import { Advertisement } from "../../components/vrpItem/advertisement/Advertisement";
import useGetSpareList from "../../tanstack-query/spares/useGetSpareList";
import { SpareItem } from "../../components/spares/SpareItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SparesFilterPage } from "./filters/sparesFilter/SparesFilterPage";
import useCartListMutation from "../../tanstack-query/cart/useCartListMutation";

export const SpareListPage = () => {
  const [filters, setFilters] = useState({
    brand: null,
    spare: null,
    model: null,
    start: null,
    end: null,
  });
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isSuccess, isLoading, refetch } = useGetSpareList(filters);
  const {
    mutateAsync,
    isLoading: isAdding,
    isSuccess: addSuccess,
  } = useCartListMutation();
  useEffect(() => {
    const newFilters = {
      brand: searchParams.get("brand") || null,
      spare: searchParams.get("spare") || null,
      model: searchParams.get("model") || null,
      price: { start: null, end: null },
    };
    setFilters(newFilters);
  }, [searchParams]);

  const navigateToSpareDetail = (requestId) => {
    navigate(`${requestId}`);
  };
  console.log(filters);

  const handleApplied = (selectedFilters) => {
    const { type, options } = selectedFilters;
    const newFilters = { ...filters, [type]: options.join(",") };

    setFilters(newFilters);
  };

  const handlePriceApplied = (start, end) => {
    setSearchParams((params) => {
      params.set("start", start);
      params.set("end", end);
      return params.toString();
    });
    setFilters((prevFilters) => ({
      ...prevFilters,
      start: start,
      end: end,
    }));
    const sortParams = searchParams.get("sort");
    if (sortParams) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        sort: sortParams,
      }));
    }
  };

  const handleRadioApplied = (itemId) => {
    setSearchParams((params) => {
      params.set("sort", itemId);
      return params.toString();
    });
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   sort: itemId,
    // }));
    console.log(itemId);
  };

  const handleAddToCart = async (event, data) => {
    event.stopPropagation();
    const cartData = {
      category_id: data.category_id,
      master_product_id: data.master_product_id,
      item_id: data.item_id,
    };
    try {
      await mutateAsync(cartData);
      console.log(cartData)
      console.log("Item added to cart successfully.");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className={classes.box}>
      <SparesFilterPage
        onApply={handleApplied}
        onPriceApply={handlePriceApplied}
        onSelection={(itemId) => handleRadioApplied(itemId)}
      />
      <Advertisement image={spare_Advertisement} />

      <div className={classes.box__space}>
        <div className={classes.box__itemList}>
          {data?.map((spareItem, index) => (
            <SpareItem
              key={spareItem.id}
              item={spareItem}
              onClick={navigateToSpareDetail}
              onAddToCart={(event) =>
                handleAddToCart(event, {
                  category_id: spareItem.category_id,
                  master_product_id: spareItem.master_product_id,
                  item_id: spareItem.id,
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
