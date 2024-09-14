import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messagesSlice";
import chatSlice from "./chatSlice";
import vetsSlice from "./vetsSlice";
import sheltersSlice from "./sheltersSlice";
import petTypesSlice from "./petTypesSlice";
import breedsSlice from "./breedsSlice";
import petsSlice from "./petsSlice";
import AdminPanelSlice from "./AdminPanelSlice";
import adoptionRequestSlice from "./adoptionRequestSlice";

const applicationStore = configureStore({
  reducer: {
    messages: messagesSlice,
    chat: chatSlice,
    vets: vetsSlice,
    shelters: sheltersSlice,
    petTypes: petTypesSlice,
    breeds: breedsSlice,
    pets: petsSlice,
    adminPanel: AdminPanelSlice,
    adoptionrequests: adoptionRequestSlice,
  },
});

export default applicationStore;
