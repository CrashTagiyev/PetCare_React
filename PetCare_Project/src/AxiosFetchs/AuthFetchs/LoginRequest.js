import { PetCareAPI } from "../../APIs/PetCareAPI";
import { jwtDecode } from "jwt-decode";

export const LoginRequest = async (emailAdress, password, event) => {
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
    console.log("status codddu bu " + statusCode);
      if (statusCode <= 300) {
        const decodedToken = jwtDecode(token);
        const roles = decodedToken.role;
        const username = decodedToken.username; // Ensure to get the correct claim
        const emailAddress = decodedToken.email; // Ensure to get the correct claim
        const profileImage = decodedToken.profileimageurl;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        console.log(message);
        console.log(statusCode);
        const user = {
          username: username,
          emailAdress: emailAddress,
          roles: roles,
          profileImage: profileImage
        };
        console.log(user);
        return user;
      } else {
        console.log(message);
        console.log(statusCode);
      }
  } catch (error) {
    console.log(error);
  }
};
