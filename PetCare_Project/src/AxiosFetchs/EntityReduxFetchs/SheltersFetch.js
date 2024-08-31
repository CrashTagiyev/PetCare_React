import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../APIs/PetCareAPI";

export const sheltersFetch = createAsyncThunk(
  "content/sheltersFetch",
  async (filterOptions) => {
    const response = await PetCareAPI.post(
      "/shelters/GetShelters",
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
