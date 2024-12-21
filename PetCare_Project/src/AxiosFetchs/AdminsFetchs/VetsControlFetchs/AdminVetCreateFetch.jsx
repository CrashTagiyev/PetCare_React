import PetCareAPI from "../../../APIs/PetCareAPI";




export const adminVetCreateFetch = async (newVetDatas) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      const petTypes = newVetDatas.petTypes.map(Number);
      
      formData.append("UserName", newVetDatas.username);
      formData.append("Email", newVetDatas.email);
      formData.append("Password", newVetDatas.password);
      formData.append("Firstname", newVetDatas.firstname);
      formData.append("PhoneNumber",newVetDatas.phoneNumber)
      formData.append("Lastname", newVetDatas.lastname);
      formData.append("About", newVetDatas.about);
      formData.append("DateOfBirth", newVetDatas.dateofbirth);
      formData.append("City", newVetDatas.city);
      formData.append("Address", newVetDatas.address);
      formData.append("ProficientPetTypesIds", petTypes);

      if (newVetDatas.profileimage && newVetDatas.profileimage[0]) {
        formData.append("ProfileImage", newVetDatas.profileimage[0].originFileObj);
      }
  
      const response = await PetCareAPI.post("admin/AdminCreateVet", formData, {
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