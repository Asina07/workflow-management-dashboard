import axios from "axios";
import { BASE_URL } from './apiPaths';
//Base URL for API requests
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Attach token before sending request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response Interceptor
//Handle responses and errors globally
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // if (error.response) {
//     //   // Handle specific status codes
//     //   if (error.response.status === 401) {
//     //     // Unauthorized, possibly redirect to login
//     //     window.location.href = "/login";
//     //   } else if (error.response.status === 500) {
//     //     console.error("Server error. Please try again later.");
//     //   }
//     // } else if (error.code === "ECONNABORTED") {
//     //   console.error("Request timeout. Please try again.");
//     // }
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        // Remove token and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // optional if you store user info
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
