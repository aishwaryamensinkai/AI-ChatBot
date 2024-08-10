// app/components/LandingPage.js
import React from "react";
import LanguageSelector from "./LanguageSelector";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "../css/LandingPage.css";

const LandingPage = ({ onStartChat, selectedLanguage, onSelectLanguage }) => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <h1 className="logo">AI Support Center</h1>
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
          <p>Sign in to start using the AI</p>
        </SignedOut>
        <SignedIn>
          <button onClick={onStartChat}>Start Chat</button>
        </SignedIn>
      </div>
    </div>
  );
};

export default LandingPage;
