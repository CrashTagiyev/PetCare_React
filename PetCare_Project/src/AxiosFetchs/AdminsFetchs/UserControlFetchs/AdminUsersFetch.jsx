import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../../APIs/PetCareAPI";

export const AdminUsersFetch = createAsyncThunk(
  "content/adminUsersFetch",
  async (filterOptions) => {
    try {
      const response = await PetCareAPI.post(
        "/admin/GetAppUsers",
        {
          PageNumber: filterOptions?.pageNumber,
          PageSize: filterOptions?.pageSize,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
);
