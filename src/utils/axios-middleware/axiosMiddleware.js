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



export default axiosInstance;
