import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../../APIs/PetCareAPI";

export const adminSheltersFetch = createAsyncThunk(
  "content/adminSheltersFetch",
  async (filterOptions) => {
    try {
      const response = await PetCareAPI.post(
        "/admin/getshelters",
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
    } catch (error) {
      if (error) console.log(error);
    }
  }
);
