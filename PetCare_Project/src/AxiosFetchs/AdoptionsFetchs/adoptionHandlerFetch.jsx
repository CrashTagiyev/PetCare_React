import PetCareAPI from "../../APIs/PetCareAPI";

export const adoptionRequestHandler = async (adoptionId, response) => {
  try {
    const result = await PetCareAPI.post(
      `/company/HandleRequest`,
      {
        AdoptionId: adoptionId,
        Response: response,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, 
      }
    );
      
    return result.data;
  } catch (error) {
    console.error("Error handling adoption request:", error);
    throw error;
  }
};
