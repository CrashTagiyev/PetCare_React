import PetCareAPI from "../../../APIs/PetCareAPI";

export const adminDeleteUser = async (id) => {
    try {
      const response = await PetCareAPI.delete(`/admin/deleteuser?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error; 
    }
  };