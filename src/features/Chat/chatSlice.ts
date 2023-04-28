import { createSlice } from "@reduxjs/toolkit";

export interface MessageInterface {
  message: string;
  date: string;
  type: string;
}

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [] as MessageInterface[],
    typing : "",
  },
  reducers: {
    send: (state, action) => {
      state.messages.push({
        message: action.payload.message,
        type: action.payload.type,
        date: action.payload.date,
      });
      if (action.payload.message === "who are you?") {
        state.messages.push({
          message: "I am a chat bot...",
          type: "received",
          date: action.payload.date,
        });
        console.log("received default");
      } else if (action.payload.message === "what you can do?") {
        state.messages.push({
          message: "I can help you if you are facing any problem",
          type: "received",
          date: action.payload.date,
        });
        console.log("received default");
      }
      console.log("chat from reducer ", state);
    },
  },
});

export const { send } = chatSlice.actions;
export default chatSlice.reducer;
