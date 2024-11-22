export function convertToObjectArray(data) {
  return Object.entries(data).map(([key, value]) => ({
    title: key.replace("_", " "), // Format title by replacing underscores with spaces
    ...value, // Spread the properties from the inner object
  }));
}