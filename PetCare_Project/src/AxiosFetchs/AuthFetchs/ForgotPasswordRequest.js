import { PetCareAPI } from "../../APIs/PetCareAPI";

export const ForgotPassowrdRequest = async (emailAddress) => {
  const response = await PetCareAPI.post(
    "/Account/ForgotPassword",
    {
      Email: emailAddress,
    },
    { headers: { "Content-Type": "application/json" }, withCredentials: true }
  );
  var responseData = {
    code: response.data.statusCode,
    message: response.data.statusMessage,
  };
 
  return responseData;
};
