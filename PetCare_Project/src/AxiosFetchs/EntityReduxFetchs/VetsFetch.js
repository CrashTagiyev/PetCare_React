import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../APIs/PetCareAPI";

export const VetsFetch = createAsyncThunk("content/vetsFetch", async () => {
  const response = await PetCareAPI.get(
    "/RepoTest/GetAllByRole",
    {
     params:{
        roleName: "Vet",
     }
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
});
