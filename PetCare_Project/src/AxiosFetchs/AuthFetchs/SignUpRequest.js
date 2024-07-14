import { PetCareAPI } from "../../APIs/PetCareAPI";
import { jwtDecode } from "jwt-decode";

export const SignUpRequest = async (newUserDatas) => {
  event.preventDefault();
  console.log(newUserDatas);
  try {
    const response = await PetCareAPI.post(
      "Account/Register",
      {
        UserName: newUserDatas.username,
        Email: newUserDatas.email,
        Password: newUserDatas.password,
        Firstname: newUserDatas.firstname,
        Lastname: newUserDatas.lastname,
        DateOfBirth: newUserDatas.dateofbirth,
        City: newUserDatas.city,
        Address: newUserDatas.address,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.data);
    return response.data;
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
