import axios from "axios";
import { redirect } from "react-router-dom";
export const BASE_URL = `http://localhost:5067/api`;

export const PetCareAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// PetCareAPI.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       // Redirect to login if no token is found
//       redirect("/login");
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// PetCareAPI.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const response = await axios.post(
//           "http://localhost:5067/api/Account/RefreshToken",
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         );

//         const { accessToken, refreshToken: message } = response.data;

//         console.log(message);
//         console.log(accessToken);

//         localStorage.setItem("accessToken", accessToken);

//         // Retry the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return axios(originalRequest);
//       } catch (error) {
//         localStorage.clear();
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default PetCareAPI;
