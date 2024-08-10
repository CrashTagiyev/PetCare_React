import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messagesSlice";
import chatSlice from "./chatSlice";
import vetsSlice from "./vetsSlice";

const applicationStore = configureStore({
  reducer: {
    messages: messagesSlice,
    chat: chatSlice,
    vets: vetsSlice
  },
});

export default applicationStore;
