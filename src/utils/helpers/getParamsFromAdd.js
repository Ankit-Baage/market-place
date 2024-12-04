export const getParamsFromAdd = (paramsString) => {
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
