import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const getTokenDuration = () => {
  const expirationTime = Cookies.get("expiryTimestamp");

  if (!expirationTime) return 0; // Handle missing expiry

  const expirationTimestamp = parseFloat(expirationTime) * 1000; // Convert seconds → milliseconds
  const now = Date.now(); // Get current time in milliseconds

  return expirationTimestamp - now; // Return remaining time
};
export const getAuthToken = () => {
  const authToken = Cookies.get("authToken");
  if (!authToken) {
    return null;
  }

  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }

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
