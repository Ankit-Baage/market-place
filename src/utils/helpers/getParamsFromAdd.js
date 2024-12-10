const getParamsFromAdd = (paramsString) => {
  const filterKeys = ["brand", "spare", "model", "start", "end", "sort"];
  const parsedFilters = {};

  // Split the string by `&` to get individual key-value pairs
  const pairs = paramsString.split("&");

  // Loop through each pair and map it to the filter keys
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    const cleanedKey = key.slice(0, -1); // Remove the trailing "s" (e.g., "brands" -> "brand")

    if (filterKeys.includes(cleanedKey)) {
      // If the value is an empty string, set it as null
      parsedFilters[cleanedKey] = value === "" ? null : value;
    }
  });

  // Ensure all keys exist, even if missing in the params string
  filterKeys.forEach((key) => {
    if (!(key in parsedFilters)) {
      parsedFilters[key] = null;
    }
  });

  return parsedFilters;
};

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

export const handleNavigateFromAdvertisement = (item, navigate) => {
  if (!item?.params) {
    console.log("item.params is missing or invalid, not proceeding.");
    return; // Exit early if item.params is not valid
  }

  const filters = getParamsFromAdd(item.params);
  const queryParams = convertFiltersToQueryParams(filters);
  const newUrl = `${item.navigate_to_page}?${queryParams}`;

  if (queryParams && queryParams !== "") {
    console.log("Navigating to:", newUrl);
    navigate(newUrl); // Actually use the navigate function passed from the component
    return newUrl;
  } else {
    console.log("Query params are empty or undefined, not navigating.");
  }
};
