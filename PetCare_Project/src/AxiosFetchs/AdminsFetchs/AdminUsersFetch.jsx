import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../APIs/PetCareAPI";



export const AdminUsersFetch = createAsyncThunk(
    "content/adminUsersFetch",
    async (filterOptions) => {
      const response = await PetCareAPI.post(
        "/admin/AdminGetUsers",
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
    }
  );