import { PetCareAPI } from "../../APIs/PetCareAPI";


export const SignUpRequest = async (newUserDatas) => {
  event.preventDefault();
  try {
    const formData = new FormData();

    // Append each field to the FormData
    formData.append("UserName", newUserDatas.username);
    formData.append("Email", newUserDatas.email);
    formData.append("Password", newUserDatas.password);
    formData.append("Firstname", newUserDatas.firstname);
    formData.append("Lastname", newUserDatas.lastname);
    formData.append("DateOfBirth", newUserDatas.dateofbirth);
    formData.append("City", newUserDatas.city);
    formData.append("Address", newUserDatas.address);

    // Handle the profile image
    if (newUserDatas.profileimage && newUserDatas.profileimage[0]) {
      formData.append("ProfileImage", newUserDatas.profileimage[0].originFileObj);
    }

    const response = await PetCareAPI.post("Account/Register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

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
