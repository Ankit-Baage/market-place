// import axios from 'axios';
// import Cookies from 'js-cookie';

// const attachTokenMiddleware = (config) => {
//   const authToken = Cookies.get('authToken');

//   if (authToken) {
//     config.headers.Authorization = `Bearer ${authToken}`;
//   }

//   return config;
// };

// const axiosInstance = axios.create();

// axiosInstance.interceptors.request.use(attachTokenMiddleware);

// export default axiosInstance;


import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Define protected routes that require an auth token
const protectedRoutes = ['/buy', '/purchase', '/checkout']; // example routes

const attachTokenMiddleware = (config) => {
  const authToken = Cookies.get('authToken');

  // Check if the request is to a protected route and authToken is missing
  const isProtectedRoute = protectedRoutes.some(route => config.url.includes(route));
  if (isProtectedRoute && !authToken) {
    // If not authenticated and trying to access a protected route, redirect to login
    window.location.href = '/login'; // Or use navigate('/login') if inside a React component
    return Promise.reject(new Error("Authentication required")); // Prevent the request from being sent
  }

  // Attach token if available
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
};

const axiosInstance = axios.create();

// Add request interceptor
axiosInstance.interceptors.request.use(attachTokenMiddleware, (error) => Promise.reject(error));

export default axiosInstance;
