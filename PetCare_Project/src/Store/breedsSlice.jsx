import react from "react";
import { createSlice } from "@reduxjs/toolkit";
import { FetchBreedsByPetTypeId } from "../AxiosFetchs/EntityReduxFetchs/FetchBreedsByPetTypeId";

const breedsSlice = createSlice({
  name: "breeds",
  initialState: {
    breedsArray: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchBreedsByPetTypeId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(FetchBreedsByPetTypeId.fulfilled, (state, action) => {
      state.breedsArray = action.payload;
      state.isLoading = false;
    });
    builder.addCase(FetchBreedsByPetTypeId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const {} = breedsSlice.actions;
export default breedsSlice.reducer;
