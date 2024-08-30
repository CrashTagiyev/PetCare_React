import PetCareAPI from "../../APIs/PetCareAPI";

export const FetchPet = async (id) => {
  try {
    const response = await PetCareAPI.get("/pet/getPetById", {
      params: {
        Id: id,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error happened: ${error}`);
    throw error; 
  }
};
