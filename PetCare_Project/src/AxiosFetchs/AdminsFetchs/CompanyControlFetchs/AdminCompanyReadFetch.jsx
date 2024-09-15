import PetCareAPI from "../../../APIs/PetCareAPI";

export const adminCompanyReadFetch = async (userId) => {
  try {
    const response = await PetCareAPI.get(`/admin/GetCompany?companyId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
