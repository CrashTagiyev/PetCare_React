import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../APIs/PetCareAPI";



export const AdminVetsFetch = createAsyncThunk(
    "content/adminVetsFetch",
    async (filterOptions) => {
      const response = await PetCareAPI.post(
        "/admin/AdminGetVets",
        {
          PageNumber: filterOptions.pageNumber,
          PageSize: filterOptions.pageSize,
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