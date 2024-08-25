import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../APIs/PetCareAPI";

export const FetchBreedsByPetTypeId = createAsyncThunk(
  "content/fetchBreedsByPetTypeId",
  async (id) => {
    const response = await PetCareAPI.get("/pet/GetPetTypeBreeds", {
      params: {
        petTypeId: id,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);
