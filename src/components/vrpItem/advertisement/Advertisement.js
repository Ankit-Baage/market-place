import React from "react";
import classes from "./advertisement.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getParamsFromAdd } from "../../../utils/helpers/getParamsFromAdd";
import { setFilterOption } from "../../../store/catergory/categorySlice";

const convertFiltersToQueryParams = (filters) => {
  const queryParams = [];

  // Loop through each filter and generate the query string
  for (const key in filters) {
    if (filters[key] && filters[key] !== null) {
      // If the filter has a value, join the array values by commas (if any)
      const value = Array.isArray(filters[key])
        ? filters[key].join(",")
        : filters[key];

      // Push the formatted query parameter
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  // Join all query parameters with '&' and return the result
  return queryParams.join("&");
};

export const Advertisement = ({ image }) => {
  console.log("advertisement", image);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filters = getParamsFromAdd(image[0].params);

  const handleClick = () => {
    // dispatch(
    //   setFilterOption({
    //     brand: filters.brand,
    //     spare: filters.spare,
    //     model: filters.model,
    //     start: filters.start,
    //     end: filters.end,
    //     sort: filters.sort,
    //   })
    // );
    // navigate(`/${image[0].navigate_to_page}`)
    const queryParams = convertFiltersToQueryParams(filters);;

    // Log the query string or set it in the URL
    console.log("Generated Query Params:", queryParams);

    // Example: You can redirect to the new URL or update the browser's location
    const newUrl = `${image[0].navigate_to_page}?${queryParams}`;
    navigate(newUrl)
    console.log(filters);
  };
  return (
    <div className={classes.box} onClick={handleClick}>
      <img
        src={image[0]?.url}
        alt="advertisement"
        className={classes.box__img}
      />
    </div>
  );
};
