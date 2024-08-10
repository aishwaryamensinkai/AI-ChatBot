import React, { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPaperPlane,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "../css/Chatbot.css";

let feedbackTimer;
let recognition;

if (typeof window !== "undefined") {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  }
}

const Chatbot = ({ selectedLanguage, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(0);
  const [isMicActive, setIsMicActive] = useState(false);

  // Ref for the messages container
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchGreeting = async () => {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "",
          language: selectedLanguage,
          isFirstMessage: true,
        }),
      });
      const data = await response.json();
      setMessages([{ text: data.response, user: false }]);
    };

    fetchGreeting();
  }, [selectedLanguage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessages([...messages, { text: input, user: true }]);
    setInput("");

    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        language: selectedLanguage,
        isFirstMessage: messages.length === 0,
      }),
    });
    const data = await response.json();
    setMessages([
      ...messages,
      { text: input, user: true },
      { text: data.response, user: false },
    ]);

    resetFeedbackTimer();
  };

  const startFeedbackTimer = useCallback(() => {
    setShowFeedback(false);
    const timer = setTimeout(() => {
      setShowFeedback(true);
    }, 120000);
    return timer;
  }, []);

  const resetFeedbackTimer = useCallback(() => {
    if (feedbackTimer) {
      clearTimeout(feedbackTimer);
    }
    feedbackTimer = startFeedbackTimer();
  }, [startFeedbackTimer]);

  useEffect(() => {
    let feedbackTimer = startFeedbackTimer();
    return () => clearTimeout(feedbackTimer);
  }, [startFeedbackTimer]);

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFeedbackSubmit = () => {
    console.log("User feedback:", feedback);
    setShowFeedback(false);
    onBack(); // Navigate back to the landing page
  };

  const handleMicClick = () => {
    if (!recognition) return;

    setIsMicActive(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInput(speechResult);
      setIsMicActive(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsMicActive(false);
    };

    recognition.onend = () => {
      setIsMicActive(false);
    };
  };

  return (
    <div className="chatbot-container">
      <nav className="navbar">
        <button onClick={onBack} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="logo">AI Support Center</h1>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.user ? "user-message" : "chatbot-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {/* Add a dummy element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="button"
          onClick={handleMicClick}
          className={isMicActive ? "mic-active" : ""}
        >
          <FontAwesomeIcon
            icon={faMicrophone}
            color={isMicActive ? "red" : "black"}
          />
        </button>
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
      {showFeedback && (
        <div className="feedback-overlay">
          <div className="feedback-form">
            <h3>Rate the chatbot</h3>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${feedback >= star ? "filled" : ""}`}
                  onClick={() => setFeedback(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
