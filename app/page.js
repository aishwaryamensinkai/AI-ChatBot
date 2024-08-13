// app/page.js
"use client";
import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import Chatbot from "./components/Chatbot";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const HomePage = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleChatStart = () => {
    setShowChatbot(true);
  };

  const handleBack = () => {
    setShowChatbot(false);
  };

  return (
    <ClerkProvider>
      <SignedOut>
        <LandingPage
          onStartChat={handleChatStart}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
        />
      </SignedOut>
      <SignedIn>
        <div>
          {!showChatbot ? (
            <LandingPage
              onStartChat={handleChatStart}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
            />
          ) : (
            <Chatbot selectedLanguage={selectedLanguage} onBack={handleBack} />
          )}
        </div>
        {/* <UserButton /> */}
      </SignedIn>
    </ClerkProvider>
  );
};

export default HomePage;
