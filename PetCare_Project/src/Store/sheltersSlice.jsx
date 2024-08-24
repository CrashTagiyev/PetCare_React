import react from "react";
import { createSlice } from "@reduxjs/toolkit";
import { sheltersFetch } from "../AxiosFetchs/EntityReduxFetchs/SheltersFetch";
const sheltersSlice = createSlice({
  name: "shelters",
  initialState: {
    sheltersArray: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sheltersFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sheltersFetch.fulfilled, (state, action) => {
      state.sheltersArray = action.payload;
      state.isLoading = false;
    });
    builder.addCase(sheltersFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const {} = sheltersSlice.actions;
export default sheltersSlice.reducer;
