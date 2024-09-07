import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../../APIs/PetCareAPI";



export const AdminCompaniesFetch = createAsyncThunk(
    "content/adminCompaniesFetch",
    async (filterOptions) => {
      const response = await PetCareAPI.post(
        "/admin/AdminGetCompanies",
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