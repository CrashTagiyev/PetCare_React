import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../APIs/PetCareAPI";

export const FetchPets = createAsyncThunk(
  "content/fetchPets",
  async (filterOptions) => {
    const response = await PetCareAPI.post(
      "/Pet/GetPetsFiltered",
      {
        "IsAll":filterOptions.isAll,
        "PetName":filterOptions.petName,
        "Size":filterOptions.size,
        "MinAge":filterOptions.minAge,
        "MaxAge":filterOptions.maxAge,
        "Gender":filterOptions.gender,
        "MinWeight":filterOptions.minWeight,
        "MaxWeight":filterOptions.maxWeight,
        "BreedId":filterOptions.breedId,
        "PetTypeId":filterOptions.petTypeId
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
