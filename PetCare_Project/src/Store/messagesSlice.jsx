import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// chat-den mesajlari goturmek ucun useSelector-dan istifade edeciyik
    // const chats = useSelector(store => store.chat);

const initialState = [];
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
  },
});

export const {add} = messageSlice.actions;
export default messageSlice.reducer
