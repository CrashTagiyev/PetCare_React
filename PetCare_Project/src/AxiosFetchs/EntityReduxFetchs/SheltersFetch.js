import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../APIs/PetCareAPI";

export const sheltersFetch = createAsyncThunk("content/sheltersFetch", async () => {
  const response = await PetCareAPI.get("/shelters/GetShelters", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
});
