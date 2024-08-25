import react from "react";
import { createSlice } from "@reduxjs/toolkit";
import { FetchPetTypes } from "../AxiosFetchs/EntityReduxFetchs/FetchPetTypes";
const petTypesSlice = createSlice({
  name: "petTypes",
  initialState: {
    petTypesArray: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchPetTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(FetchPetTypes.fulfilled, (state, action) => {
      state.petTypesArray = action.payload;
      state.isLoading = false;
    });
    builder.addCase(FetchPetTypes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const {} = petTypesSlice.actions;
export default petTypesSlice.reducer;
