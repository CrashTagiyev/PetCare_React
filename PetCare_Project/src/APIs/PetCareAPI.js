import axios from "axios";
export const BASE_URL = `http://localhost:5067/api`;

export const PetCareAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor
PetCareAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

PetCareAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          "http://localhost:5067/api/Account/RefreshToken",
          { refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const { accessToken, refreshToken: newRefreshToken, message } = response.data;

        console.log(message);
        console.log(accessToken);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default PetCareAPI;
