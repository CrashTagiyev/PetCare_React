import react from "react";
import { createSlice } from "@reduxjs/toolkit";
import { FetchPets } from "../AxiosFetchs/EntityReduxFetchs/FetchPets";

const petsSlice = createSlice({
  name: "pets",
  initialState: {
    petsArray: [],
    totalPets:0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchPets.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(FetchPets.fulfilled, (state, action) => {
      state.petsArray = action.payload.petsArray;
      state.totalPets = action.payload.totalPets
      state.isLoading = false;
    });
    builder.addCase(FetchPets.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const {} = petsSlice.actions;
export default petsSlice.reducer;
