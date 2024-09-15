import PetCareAPI from "../../../APIs/PetCareAPI";

export const adminCompanyUpdateFetch = async (updatedUserDatas) => {
  try {
    const formData = new FormData();
    formData.append("Id", updatedUserDatas.id);
    formData.append("UserName", updatedUserDatas.userName);
    formData.append("CompanyName", updatedUserDatas.companyName);
    formData.append("Email", updatedUserDatas.email);
    formData.append("About", updatedUserDatas.about);

    if (updatedUserDatas.profileImage && updatedUserDatas.profileImage[0]) {
      formData.append(
        "ProfileImage",
        updatedUserDatas.profileImage[0].originFileObj
      );
    } 
    

    const response = await PetCareAPI.put("/admin/UpdateCompany", formData, {
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
};
