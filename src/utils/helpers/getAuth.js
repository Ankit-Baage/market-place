import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const getAuthToken = () => {
  console.log(Cookies.get("authToken"));
  const authToken = Cookies.get("authToken");
  return authToken;
};

export const generateId = () => {
  const authToken = Cookies.get("authToken");
  const guestId = Cookies.get("guestId");

  // Generate guestId only if both authToken and guestId are absent
  if (!authToken && !guestId) {
    const newGuestId = uuidv4();
    Cookies.set("guestId", newGuestId);
    return newGuestId;
  }

  // Return existing guestId if present
  return guestId;
};

