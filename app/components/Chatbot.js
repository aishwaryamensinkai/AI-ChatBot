// app/components/Chatbot.js
import React, { useState, useEffect, useCallback } from "react";
let feedbackTimer;

const Chatbot = ({ selectedLanguage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(0);

  // Function to fetch greeting
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

  // Handle user input submission
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

    // Reset feedback timer
    resetFeedbackTimer();
  };

  // Start feedback timer
  const startFeedbackTimer = useCallback(() => {
    setShowFeedback(false);
    const timer = setTimeout(() => {
      setShowFeedback(true);
    }, 120000); // 2 minutes
    return timer;
  }, []);

  // Reset feedback timer
  const resetFeedbackTimer = useCallback(() => {
    if (feedbackTimer) {
      clearTimeout(feedbackTimer);
    }
    feedbackTimer = startFeedbackTimer();
  }, [startFeedbackTimer]);

  // Set feedback timer on mount and reset on update
  useEffect(() => {
    let feedbackTimer = startFeedbackTimer();
    return () => clearTimeout(feedbackTimer);
  }, [startFeedbackTimer]);

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    console.log("User feedback:", feedback);
    setShowFeedback(false);
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
        <button type="submit">Send</button>
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
