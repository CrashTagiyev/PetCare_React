import { PetCareAPI } from "../../APIs/PetCareAPI";

export const ResetPasswordRequest = async (userId, token, newPassword) => {
  try {
    console.log("userid:" + userId)
    console.log("token:" + token)
    console.log("newpass:" + newPassword)
    const response = await PetCareAPI.post(
      "/Account/ResetPassword",
      {
        UserId: userId,
        Token: token,
        NewPassword: newPassword,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    const { statusMessage, statuscode } = response.data;
    return statusMessage;
  } catch (error) {
    console.log(error);
    return error;
  }
};
