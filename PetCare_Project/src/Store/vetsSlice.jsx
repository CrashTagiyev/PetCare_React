import react from "react";
import { createSlice } from "@reduxjs/toolkit";
import { VetsFetch } from "../AxiosFetchs/EntityReduxFetchs/VetsFetch";
const vetsSlice = createSlice({
  name: "vets",
  initialState: {
    vetsArray: [],
    totalVets:0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(VetsFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(VetsFetch.fulfilled, (state, action) => {
      state.vetsArray = action.payload.vetsList;
      state.totalVets = action.payload.totalVets;
      state.isLoading = false;
    });
    builder.addCase(VetsFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const {} = vetsSlice.actions;
export default vetsSlice.reducer;
