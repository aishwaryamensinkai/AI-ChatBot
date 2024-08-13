import React, { useState, useEffect } from "react";
import "../css/SmallChatbot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const SmallChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(90); // Timer starts at 90 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      onClose();
    }, 90000); // 90 seconds in milliseconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onClose]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onClose();
    }
  }, [timeLeft, onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userTimestamp = new Date().toLocaleTimeString();
    setMessages([
      ...messages,
      { text: input, user: true, timestamp: userTimestamp },
    ]);
    setInput("");

    try {
      const response = await fetch("/api/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "smallchatbot",
          message: input,
        }),
      });

      const data = await response.json();
      const botTimestamp = new Date().toLocaleTimeString();

      setMessages([
        ...messages,
        { text: input, user: true, timestamp: userTimestamp },
        { text: data.response, user: false, timestamp: botTimestamp },
      ]);
    } catch (error) {
      console.error("Error fetching from orchestrator:", error);
      setMessages([
        ...messages,
        {
          text: "Sorry, something went wrong. Please try again later.",
          user: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  };

  return (
    <div className="small-chatbot-container">
      <div className="small-chatbot-header">
        Chatbot
        <button
          className="close-chatbot"
          style={{ fontSize: "12px" }}
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className="small-chatbot-timer">Closing in: {timeLeft} seconds</div>
      <div className="small-chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.user
                ? "small-chatbot-user-message"
                : "small-chatbot-bot-message"
            }
          >
            <div className="message-text">{msg.text}</div>
            <div className="timestamp">{msg.timestamp}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="small-chatbot-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chatbot-input"
        />
        <button type="submit" className="chatbot-send-button">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default SmallChatbot;
