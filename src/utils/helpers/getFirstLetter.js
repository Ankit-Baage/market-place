export function getFirstLetter(name) {
  if (typeof name !== "string" || name.trim() === "") {
    return "";
  }
  console.log(name.trim().charAt(0).toUpperCase())
  return name.trim().charAt(0).toUpperCase();
}