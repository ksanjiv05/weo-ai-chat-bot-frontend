import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const userMessage = { sender: "user", text: inputText };
    setMessages([...messages, userMessage]);
    setInputText("");

    // Send the message to the backend
    fetch("https://your-backend-domain.com/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputText }),
    })
      .then((response) => response.json())
      .then((data) => {
        const botMessage = { sender: "bot", text: data.response };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) => {
        console.error("Error:", error);
        const errorMessage = {
          sender: "bot",
          text: "Sorry, there was an error. Please try again later.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      {/* <div className="chatbot-header">
        <h3>Chatbot</h3>
      </div> */}
      <div className="chatbot-msg-container">

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      </div>
      {/* <div className="chatbot-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div> */}
    </div>
  );
};

export default Chatbot;
