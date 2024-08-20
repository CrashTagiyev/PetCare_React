import { jwtDecode } from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetCareAPI from "../APIs/PetCareAPI";
import { useAuth } from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const usePetCareAPI = () => {
    const refresh = useRefreshToken();
    const { user, logout, login } = useAuth();
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
              const response = await PetCareAPI.post("/Account/RefreshToken", {
                withCredentials: true,
              });
              if (response.data.statusCode === 404) {
                logout(); // If refresh token is invalid or not found, logout
                return Promise.reject(error);
              }
              localStorage.setItem("accessToken", response.data.accessToken);
              const decodedToken = jwtDecode(response.data.accessToken);
              const roles = decodedToken.role;
              const username = decodedToken.username;
              const emailAddress = decodedToken.email;
              const profileImage = decodedToken.profileimageurl;
              const id = decodedToken.id;
              localStorage.setItem("accessToken", response.data.accessToken);
              const user = {
                id: id,
                username: username,
                emailAddress: emailAddress,
                roles: roles,
                profileImage: profileImage,
              };
              login(user);
              setIsSomethingChanged((prev) => !prev);
              prevRequest.headers[
                "Authorization"
              ] = `Bearer ${response.data.accessToken}`;
              return PetCareAPI(prevRequest);
            } catch (refreshError) {
              // If the refresh request itself fails, logout
              logout();
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
    }, [user, refresh, logout, login]);
  
    return { PetCareAPI,isSomethingChanged };
  };
  
  export default usePetCareAPI;
