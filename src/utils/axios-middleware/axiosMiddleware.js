import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const attachTokenMiddleware = (config) => {
  const authToken = Cookies.get("authToken");

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(attachTokenMiddleware);

// axiosInstance.interceptors.response.use(
//   (response) => response, // Return response if no error
//   (error) => {
//     if (error.response) {
//       const { status } = error.response;
//       if (status === 401) {
//         window.location = "/authentication";
//       }
//     } else if (!navigator.onLine || error.message) {
//       console.log("No internet connection. Please check your network.");
//       error.customMessage =
//         "No internet connection. Please check your network.";
//       toast.warning(error.customMessage);
//     }

//     throw error;
//   }
// );

export default axiosInstance;
