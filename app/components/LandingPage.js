/* eslint-disable @next/next/no-img-element */
// app/components/LandingPage.js
import React, { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SmallChatbot from "./SmallChatbot";
import "../css/LandingPage.css";

const LandingPage = ({ onStartChat, selectedLanguage, onSelectLanguage }) => {
  const [showSmallChatbot, setShowSmallChatbot] = useState(false);

  const handleSmallChatbotToggle = () => {
    setShowSmallChatbot((prev) => !prev);
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        {/* <h1 className="logo">ConversAI</h1> */}
        <img src="../ConversAI.png" alt="ConversAI Logo" height={"100px"} />

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
      <div className="content">
        <h2>Welcome to the Future of Support</h2>
        <p>
          Our AI chatbot is designed to assist you with software installations,
          troubleshooting, and more. Get expert help with setting up and
          configuring your software quickly and efficiently.
        </p>
        <p>
          Explore our features and see how our AI can make your life easier.
          Whether you need help with a quick question or detailed instructions,
          we are here to help 24/7.
        </p>
        <div className="language-selector-container">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onSelectLanguage={onSelectLanguage}
          />
        </div>
        <SignedOut>
          <p>
            Sign in to unlock the future experience the power of AI
            <br />
            Use our free trial today!
          </p>
          <button
            className="toggle-small-chatbot"
            onClick={handleSmallChatbotToggle}
          >
            {showSmallChatbot ? "Close Chat" : "Open Chat"}
          </button>
          {showSmallChatbot && (
            <SmallChatbot onClose={handleSmallChatbotToggle} />
          )}
        </SignedOut>
        <SignedIn>
          <button onClick={onStartChat}>Start Chat</button>
        </SignedIn>
      </div>
    </div>
  );
};

export default LandingPage;
