// FetchAdoptionRequests.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import PetCareAPI from "../../APIs/PetCareAPI";

// Creating an async thunk for fetching adoption requests
export const FetchAdoptionRequests = createAsyncThunk(
  "adoptionrequests/fetchAdoptionRequests",
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await PetCareAPI.get("/company/GetCompanyAdoptions", {
        params: {
          companyId: companyId,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data)
      return response.data; // Make sure the response structure matches your state expectations
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      // Use rejectWithValue to handle errors properly within Redux
      return rejectWithValue(error.response?.data );
    }
  }
);
