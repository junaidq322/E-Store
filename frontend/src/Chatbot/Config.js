import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import "./Chatbot.css";
import Options from "../Components/Options/Options";

const config = {
  botName: "E-Bot",
  initialMessages: [
    createChatBotMessage(`Hello. How may I help you?`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
};

export default config;
