import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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

const Chatbot = ({ selectedLanguage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(0);
  const [isMicActive, setIsMicActive] = useState(false); // New state to track mic status

  useEffect(() => {
    const fetchGreeting = async () => {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "", language: selectedLanguage }),
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
      body: JSON.stringify({ message: input, language: selectedLanguage }),
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

  const handleFeedbackSubmit = () => {
    console.log("User feedback:", feedback);
    setShowFeedback(false);
  };

  const handleMicClick = () => {
    if (!recognition) return;

    setIsMicActive(true); // Mic is active
    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInput(speechResult);
      setIsMicActive(false); // Mic is off after getting result
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsMicActive(false); // Mic is off if there's an error
    };

    recognition.onend = () => {
      setIsMicActive(false); // Mic is off when recognition ends
    };
  };

  return (
    <div className="chatbot-container">
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
            color={isMicActive ? "red" : "black"} // Changes color when active
          />
        </button>
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
      {showFeedback && (
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
      )}
    </div>
  );
};

export default Chatbot;
