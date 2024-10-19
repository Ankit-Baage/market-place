
import { bestNewPhonesProductUrl, bestOpenBoxProductUrl, bestSparesProductUrl, bestVrpProductUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const bestVrpProductRequest = async () => {
  try {
    const response = await axiosInstance.get(
      bestVrpProductUrl,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const bestSparesProductRequest = async () => {
  try {
    const response = await axiosInstance.get(
      bestSparesProductUrl,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const bestNewPhonesProductRequest = async () => {
  try {
    const response = await axiosInstance.get(
      bestNewPhonesProductUrl,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const bestOpenBoxProductRequest = async () => {
  try {
    const response = await axiosInstance.get(
      bestOpenBoxProductUrl,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.data);
    return response;
  } catch (error) {
    throw error;
  }
};



