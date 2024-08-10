// app/page.js
"use client";
import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import Chatbot from "./components/Chatbot";

const HomePage = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleChatStart = () => {
    setShowChatbot(true);
  };

  return (
    <div>
      {!showChatbot ? (
        <LandingPage
          onStartChat={handleChatStart}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage} // Make sure this is passed as a function
        />
      ) : (
        <Chatbot selectedLanguage={selectedLanguage} />
      )}
    </div>
  );
};

export default HomePage;
