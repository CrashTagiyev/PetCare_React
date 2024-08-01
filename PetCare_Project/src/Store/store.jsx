import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messagesSlice";
import chatSlice from "./chatSlice";

const applicationStore = configureStore({
  reducer: {
    messages: messagesSlice,
    chat: chatSlice
  },
});

export default applicationStore;
