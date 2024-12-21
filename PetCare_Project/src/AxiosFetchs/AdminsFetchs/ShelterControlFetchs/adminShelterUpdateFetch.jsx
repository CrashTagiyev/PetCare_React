import PetCareAPI from "../../../APIs/PetCareAPI"


export const adminShelterUpdateFetch = async (updatedShelter)=>{
    try {
        const formData = new FormData();
        formData.append("Id", updatedShelter.id);
        formData.append("ShelterName", updatedShelter.shelterName);
        formData.append("CompanyId", updatedShelter.companyId);
        formData.append("AboutShelter", updatedShelter.aboutShelter);
        formData.append("AdoptionPolicy", updatedShelter.adoptionPolicy);
        formData.append("City", updatedShelter.city);
        formData.append("Address", updatedShelter.address);
        formData.append("EmailAddress", updatedShelter.emailAddress);
    
        if (updatedShelter.shelterImage && updatedShelter.shelterImage[0]) {
          formData.append(
            "ShelterImage",
            updatedShelter.shelterImage[0].originFileObj
          );
        } 
        
    
        const response = await PetCareAPI.put("/admin/UpdateShelter", formData, {
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
    