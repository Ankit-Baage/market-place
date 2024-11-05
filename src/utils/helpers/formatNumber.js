export const formatNumber = (number) => {
  const numberString = number.toString();

  // Add commas after thousandth, tenth thousandth, and lakh digits
  let formattedNumber = numberString.replace(
    /\B(?=(\d{5}|(\d{3})+(?!\d)))/g,
    ","
  );

  return formattedNumber;
};

export const formatDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with 0 if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`;
};
