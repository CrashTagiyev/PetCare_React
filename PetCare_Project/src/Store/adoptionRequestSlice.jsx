import { createSlice } from "@reduxjs/toolkit";
import { FetchAdoptionRequests } from "../AxiosFetchs/EntityReduxFetchs/FetchAdoptionRequests";

const AdoptionRequestsSlice = createSlice({
  name: "adoptionrequests",
  initialState: {
    requestsArray: [],
    isLoading: false,
    error: null,
    selectedRequest: null, // State to store the selected request
  },
  reducers: {
    // Action to set the selected request
    setSelectedRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchAdoptionRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new fetch attempt
      })
      .addCase(FetchAdoptionRequests.fulfilled, (state, action) => {
        state.requestsArray = action.payload.requestsArray || [];
        state.isLoading = false;
      })
      .addCase(FetchAdoptionRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch requests"; // Provide meaningful error feedback
      });
  },
});

// Export the action to set the selected request
export const { setSelectedRequest } = AdoptionRequestsSlice.actions;

export default AdoptionRequestsSlice.reducer;
