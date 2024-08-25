import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messagesSlice";
import chatSlice from "./chatSlice";
import vetsSlice from "./vetsSlice";
import sheltersSlice from "./sheltersSlice";
import petTypesSlice from "./petTypesSlice";
import breedsSlice from "./breedsSlice";

const applicationStore = configureStore({
  reducer: {
    messages: messagesSlice,
    chat: chatSlice,
    vets: vetsSlice,
    shelters: sheltersSlice,
    petTypes: petTypesSlice,
    breeds: breedsSlice,
  },
});

export default applicationStore;
