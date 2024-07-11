import { PetCareAPI } from "../../APIs/PetCareAPI";
import { jwtDecode } from "jwt-decode";

export const  LoginRequest = async (emailAdress, password, event) => {
  try {
    event.preventDefault();
    const response = await PetCareAPI.post(
      "/Account/LogIn",
      {
        EmailAddress: emailAdress,
        Password: password,
      },
      {
        "Content-Type": "application/json",
        withCredentials: true,
      }
    );
    const { token, refreshToken, message, statusCode } = response.data;

    const decodedToken = jwtDecode(token);
    const roles = decodedToken.role;
    const username = decodedToken.username; // Ensure to get the correct claim
    const emailAddress = decodedToken.email; // Ensure to get the correct claim
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);

    const user = {
      username: username,
      emailAdress: emailAddress,
      roles: roles,
    };

    return user;
  } catch (error) {
    console.log(error);
  }
};
