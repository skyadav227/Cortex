import React from "react";
import "../CSS/WelcomeScreen.css";
import { FiCode, FiBriefcase, FiZap, FiCpu } from "react-icons/fi";

export default function WelcomeScreen({ onSendMessage }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const username = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "there";

  const suggestions = [
    { icon: <FiCode />, text: "Learn React" },
    { icon: <FiZap />, text: "Debug my code" },
    { icon: <FiBriefcase />, text: "Build a portfolio" },
    { icon: <FiCpu />, text: "JavaScript help" },
  ];

  return (
    <div className="welcome-screen">
      <h1>CORTEX</h1>

      <p>
        Hello, <span className="username">{username}.</span> What's on your
        mind today?
      </p>

      <div className="links">
        {suggestions.map(({ icon, text }) => (
          <button
            key={text}
            className="suggestion-card"
            onClick={() => onSendMessage(text)}
          >
            <span className="suggestion-icon">{icon}</span>
            <span>{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}