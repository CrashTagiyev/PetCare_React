import { createSlice } from "@reduxjs/toolkit";
import { AdminCompaniesFetch } from "../AxiosFetchs/AdminsFetchs/CompanyControlFetchs/AdminCompaniesFetch";
import { AdminUsersFetch } from "../AxiosFetchs/AdminsFetchs/UserControlFetchs/AdminUsersFetch";

const AdminsPanelSlice = createSlice({
  name: "adminsPanel",
  initialState: {
    usersArray: [],
    vetsArray: [],
    companiesArray: [],
    totalUsers: 0,
    totalVets: 0,
    totalCompanies: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AdminUsersFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AdminUsersFetch.fulfilled, (state, action) => {
      state.usersArray = action.payload.usersList;
      state.totalUsers = action.payload.totalUsers;
      state.isLoading = false;
    });
    builder.addCase(AdminUsersFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(AdminCompaniesFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AdminCompaniesFetch.fulfilled, (state, action) => {
      state.companiesArray = action.payload.companiesList;
      state.totalCompanies = action.payload.totalCompanies;
      state.isLoading = false;
    });

    builder.addCase(AdminCompaniesFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
    // builder.addCase(VetsFetch.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(VetsFetch.fulfilled, (state, action) => {
    //   state.vetsArray = action.payload.vetsList;
    //   state.totalVets = action.payload.totalVets;
    //   state.isLoading = false;
    // });
    // builder.addCase(VetsFetch.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = true;
    // });
  },
});

export const {} = AdminsPanelSlice.actions;
export default AdminsPanelSlice.reducer;
