import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import PetCareAPI from "../APIs/PetCareAPI";
import { useAuth } from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const usePetCareAPI = () => {
  const refresh = useRefreshToken();
  const { user, logout, loginWithoutNavigation } = useAuth();
  const [isSomethingChanged, setIsSomethingChanged] = useState(true);

  useEffect(() => {
    const requestIntercept = PetCareAPI.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          const currentAccessToken = localStorage.getItem("accessToken");
          config.headers["Authorization"] = `Bearer ${currentAccessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = PetCareAPI.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 ||
          (error?.response?.status === 403 && !prevRequest?.sent)
        ) {
          prevRequest.sent = true;
          try {
            const response = await PetCareAPI.post(
              "/Account/RefreshToken",
              {},
              { withCredentials: true }
            );
            if (response.data.status.statusCode === 404) {
              logout();
              return Promise.reject(error);
            }

            const newAccessToken = response.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            const decodedToken = jwtDecode(newAccessToken);
            const {
              id,
              username,
              email,
              role: roles,
              profileimageurl: profileImage,
            } = decodedToken;

            const user = {
              id,
              username,
              emailAddress: email,
              roles,
              profileImage,
            };
            loginWithoutNavigation(user);

            setIsSomethingChanged((prev) => !prev);
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            return PetCareAPI(prevRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      PetCareAPI.interceptors.request.eject(requestIntercept);
      PetCareAPI.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh, logout, loginWithoutNavigation]);

  return { PetCareAPI, isSomethingChanged };
};

export default usePetCareAPI;
