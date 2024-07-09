import { PetCareAPI } from "../../APIs/PetCareAPI";

export const LoginRequest = async (emailAdress, password,event) => {
  try {
    event.preventDefault();
    console.log(emailAdress);
    console.log(password    );
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

    console.log(statusCode);
    console.log(message);
    console.log(token);

    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.log(error);
  }
};
