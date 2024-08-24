import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messagesSlice";
import chatSlice from "./chatSlice";
import vetsSlice from "./vetsSlice";
import sheltersSlice from "./sheltersSlice";

const applicationStore = configureStore({
  reducer: {
    messages: messagesSlice,
    chat: chatSlice,
    vets: vetsSlice,
    shelters:sheltersSlice,
  },
});

export default applicationStore;
