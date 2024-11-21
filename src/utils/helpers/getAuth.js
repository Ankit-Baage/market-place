import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const getAuthToken = () => {
  console.log(Cookies.get("authToken"));
  const authToken = Cookies.get("authToken");
  return authToken;
};

export const generateId = () => {
  const authToken = Cookies.get("authToken");
  if (!authToken) {
    const guestId = uuidv4();
    Cookies.set("guestId", guestId);
    return guestId;
  }

  return Cookies.get("guestId");
};
