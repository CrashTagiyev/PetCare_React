import PetCareAPI from "../../../APIs/PetCareAPI";

export const AdminUserInfoFetch = async (userId) => {
  try {
    const response = await PetCareAPI.get(`/admin/GetAppUser?userId=${userId}`, {
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
