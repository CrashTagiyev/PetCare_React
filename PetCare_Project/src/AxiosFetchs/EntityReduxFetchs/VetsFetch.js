import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../APIs/PetCareAPI";

export const VetsFetch = createAsyncThunk(
  "content/vetsFetch",
  async (filterOptions) => {
    const response = await PetCareAPI.post(
      "/vets/getvetslist",
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
