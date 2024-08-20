import { PetCareAPI } from "../../APIs/PetCareAPI";
import { jwtDecode } from "jwt-decode";

export const LoginRequest = async (emailAdress, password) => {
  try {
    console.log(emailAdress);
    console.log(password);
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
    const { accessToken,message, statusCode } = response.data;
    if (statusCode <= 300) {
      const decodedToken = jwtDecode(accessToken);
      const roles = decodedToken.role;
      const username = decodedToken.username;
      const emailAddress = decodedToken.email;
      const profileImage = decodedToken.profileimageurl;
      const id = decodedToken.id;
      localStorage.setItem("accessToken", accessToken);
      console.log(message);
      console.log(statusCode);
      const user = {
        username,
        emailAddress,
        roles,
        profileImage,
        id,
        accessToken
      };
      return user;
    } else {
      console.log(message);
      console.log(statusCode);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
      return error.response.data;
    } else {
      console.log(error);
      return { message: "An unexpected error occurred." };
    }
  }
};
