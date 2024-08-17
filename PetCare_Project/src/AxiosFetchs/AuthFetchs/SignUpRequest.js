import { PetCareAPI } from "../../APIs/PetCareAPI";


export const SignUpUserRequest = async (newUserDatas) => {
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
export const SignUpVetRequest = async (newVetDatas) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    const petTypes = newVetDatas.petTypes.map(Number);
    
    // Append each field to the FormData
    formData.append("UserName", newVetDatas.username);
    formData.append("Email", newVetDatas.email);
    formData.append("Password", newVetDatas.password);
    formData.append("Firstname", newVetDatas.firstname);
    formData.append("Lastname", newVetDatas.lastname);
    formData.append("DateOfBirth", newVetDatas.dateofbirth);
    formData.append("City", newVetDatas.city);
    formData.append("Address", newVetDatas.address);
    formData.append("ProficientPetTypesIds", petTypes);
    // Handle the profile image
    if (newVetDatas.profileimage && newVetDatas.profileimage[0]) {
      formData.append("ProfileImage", newVetDatas.profileimage[0].originFileObj);
    }

    const response = await PetCareAPI.post("Account/RegisterVet", formData, {
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
export const SignUpCompanyRequest = async (newUserDatas) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    
    
    formData.append("UserName", newUserDatas.username);
    formData.append("CompanyName", newUserDatas.companyname);
    formData.append("Email", newUserDatas.email);
    formData.append("Password", newUserDatas.password);
    formData.append("About", newUserDatas.about);
    

    if (newUserDatas.profileimage && newUserDatas.profileimage[0]) {
      formData.append("ProfileImage", newUserDatas.profileimage[0].originFileObj);
    }

    const response = await PetCareAPI.post("Account/RegisterCompany", formData, {
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
