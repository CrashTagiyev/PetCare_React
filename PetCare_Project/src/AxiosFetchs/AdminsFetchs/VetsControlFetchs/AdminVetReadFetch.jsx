import PetCareAPI from "../../../APIs/PetCareAPI";

export const adminVetReadFetch = async (vetId) => {
  try {
    const reponse = await PetCareAPI.get(
      `/admin/AdminGetVetById?vetId=${vetId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return reponse.data;
  } catch (error) {
    console.error("Error fetching vet info:", error);
    throw error;
  }
};
