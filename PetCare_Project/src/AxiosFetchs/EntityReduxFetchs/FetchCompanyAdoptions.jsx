import PetCareAPI from "../../APIs/PetCareAPI";

export const fetchCompanyAdoptions = async (companyId) => {
  try {
    console.log("COMPANY ID:",companyId)
    const response = await PetCareAPI.get(`/company/GetCompanyAdoptions`, {
      params: {
        companyId: companyId,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log("Error when fetching company adoptions:", error);
    throw error;
  }
};
