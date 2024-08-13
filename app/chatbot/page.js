// app/chatbot/page.js
import React from "react";
import Chatbot from "../components/Chatbot";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

const ChatbotPage = () => {
  return (
    <ClerkProvider>
      <SignedIn>
        <Chatbot selectedLanguage="en" />
      </SignedIn>
    </ClerkProvider>
  );
};

export default ChatbotPage;
