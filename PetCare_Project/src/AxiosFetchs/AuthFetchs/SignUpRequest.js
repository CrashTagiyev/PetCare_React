import { PetCareAPI } from "../../APIs/PetCareAPI";
import { jwtDecode } from "jwt-decode";

export const SignUpRequest = async (newUserDatas) => {
  event.preventDefault();
  console.log(newUserDatas)
  try {
    const response = await PetCareAPI.post(
      "Account/Register",
      {
        UserName: newUserDatas.username,
        Email: newUserDatas.email,
        Password: newUserDatas.password,
        Firstname: newUserDatas.firstname,
        Lastname: newUserDatas.lastname,
        DateOfBirth: newUserDatas.dateOfBirth,
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
  } catch (error) {
    console.log(error);
  }
};
