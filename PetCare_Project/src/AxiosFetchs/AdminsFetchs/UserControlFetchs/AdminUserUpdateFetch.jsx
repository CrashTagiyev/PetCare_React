import PetCareAPI from "../../../APIs/PetCareAPI";


export const adminUserUpdateFetch = async(updatedUserDatas) =>{
    try {
        const formData = new FormData();
    
        formData.append("Id", updatedUserDatas.id);
        formData.append("UserName", updatedUserDatas.userName);
        formData.append("Email", updatedUserDatas.email);
        formData.append("Password", updatedUserDatas.password);
        formData.append("Firstname", updatedUserDatas.firstname);
        formData.append("Lastname", updatedUserDatas.lastname);
        formData.append("DateOfBirth", updatedUserDatas.dateOfBirth);
        formData.append("City", updatedUserDatas.city);
        formData.append("Address", updatedUserDatas.address);
        formData.append("PhoneNumber", updatedUserDatas.phoneNumber);
        if (updatedUserDatas.profileimage && updatedUserDatas.profileimage[0]) {
          formData.append("ProfileImage", updatedUserDatas.profileimage[0].originFileObj);
        }
    
        const response = await PetCareAPI.put("admin/updateAppUser", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
    
        
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
}