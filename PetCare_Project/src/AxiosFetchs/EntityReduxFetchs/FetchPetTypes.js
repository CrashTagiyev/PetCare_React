import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../APIs/PetCareAPI";


export const FetchPetTypes=  createAsyncThunk("content/fetchPetTypes", async () => {
    const response = await PetCareAPI.get("/Pet/GetPetTypes", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  });