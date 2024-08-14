import { PetCareAPI } from "../../APIs/PetCareAPI";

export const ForgotPasswordRequest = async (emailAddress) => {
  try {
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
      errors: response.data.errors || {}, // assuming errors are returned in this format
    };
    
    return responseData;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
      return {
        message: error.response.data.statusMessage || "An error occurred.",
        errors: error.response.data.errors || {},
      };
    } else {
      console.log(error);
      return { message: "An unexpected error occurred.", errors: {} };
    }
  }
};  
