import React, { useRef, useState } from "react";
import "../CSS/Sidebar.css";

import bin from "../assets/delete.png";
import cortexdark from "../assets/cortex-logo-dark.png";
import cortexlight from "../assets/cortex-logo-light.png";

import { useNavigate } from "react-router-dom";
import { haptic } from "../utils/haptic";

import {
  FiGlobe,
  FiLogOut,
  FiInfo,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiX,
} from "react-icons/fi";

export default function Sidebar({
  chatHistory,
  activeChatId,
  onChatSelect,
  handleNewChat,
  delChat,
  clearAllChat,
  theme,
  toggleTheme,
  setSidebarOpen,
  isMobile,
  loadStatus,
}) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [longPressedId, setLongPressedId] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const longPressTimer = useRef(null);

  const handleTouchStart = (id) => {
    longPressTimer.current = setTimeout(() => {
      setLongPressedId(id);
      haptic(50);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer.current);
  };

  const filteredChats = chatHistory.filter(({ title }) =>
    title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeChatId");
    navigate("/login");
  };

  return (
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h2>
          <img
            className="cortex-logo"
            src={theme === "dark" ? cortexdark : cortexlight}
            alt="Cortex Logo"
          />
          <span className="logo-text">Cortex.</span>
        </h2>

        <p>Your AI Assistant</p>
      </div>

      <button
        className="new-chat-btn"
        disabled={loadStatus}
        onClick={() => {
          handleNewChat();
          closeSidebarOnMobile();
        }}
      >
        + New Chat
      </button>

      <button
        className="new-chat-btn mt-3 d-flex justify-content-center align-items-center"
        onClick={() => {
          clearAllChat();
          closeSidebarOnMobile();
        }}
      >
        <img src={bin} className="delete-icon" alt="Delete" />
        &nbsp; Clear All Chats
      </button>

      <input
        className="search"
        type="text"
        placeholder="Search chats..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="chat-history">
        <p className="history-title">Recent Chats</p>

        {chatHistory.length === 0 ? (
          <p className="history-title">No chats yet.</p>
        ) : filteredChats.length === 0 ? (
          <p className="text-light text-align-center mt-3 opacity-75">
            No matching chats.
          </p>
        ) : (
          filteredChats.map((item) => (
            <div key={item.id}>
              <div
                className={`chat-item ${activeChatId === item.id ? "active-chat" : ""
                  }`}
                onClick={() => {
                  onChatSelect(item.id);
                  closeSidebarOnMobile();
                  setLongPressedId(null);
                }}
                onTouchStart={() => handleTouchStart(item.id)}
                onTouchEnd={handleTouchEnd}
              >
                <span className="chat-title">• {item.title}</span>

                {(!isMobile || longPressedId === item.id) && (
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      delChat(item.id);
                      closeSidebarOnMobile();
                      setLongPressedId(null);
                    }}
                  >
                    <img
                      className="delete-icon"
                      src={bin}
                      alt="Delete chat"
                    />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="sidebar-footer">
        <button className="new-chat-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button
          className="logout-btn"
          onClick={() => {
            haptic(20);
            setShowLogoutModal(true);
          }}
        >
          <FiLogOut />
          Logout
        </button>

        <div className="version-text">Cortex v1.0</div>

        <div className="crafted-row">
          <span>Crafted with ❤︎ by Karthik</span>

          <button
            className="about-btn"
            onClick={() => {
              haptic(15);
              setShowAboutModal(true);
            }}
          >
            <FiInfo />
          </button>
        </div>
      </div>

      {showLogoutModal && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Logout?</h3>

            <p>You'll need to login again to continue using Cortex.</p>

            <div className="logout-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button className="confirm-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {showAboutModal && (
        <div
          className="logout-overlay"
          onClick={() => setShowAboutModal(false)}
        >
          <div className="about-border">
            <div
              className="about-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="about-close"
                onClick={() => setShowAboutModal(false)}
              >
                <FiX />
              </button>

              <h2>Cortex v1.0</h2>

              <p className="about-tagline">
                Built to help you think, learn and create.
              </p>

              <p className="about-description">
                Cortex is a modern AI chat assistant built with React, Node.js,
                Express and MongoDB.
              </p>

              <p className="about-description">
                Designed & developed by Karthik.
              </p>

              <div className="about-links">
                <a href="" target="_blank" rel="noreferrer">
                  <FiGlobe />
                  Portfolio
                </a>

                <a
                  href="https://github.com/skyadav227"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiGithub />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/sher-karthikeya-yadav-009193226/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiLinkedin />
                  LinkedIn
                </a>

                <a href="mailto:karthikeyayadav547@gmail.com">
                  <FiMail />
                  Email
                </a>
              </div>

              <small>Thanks for trying Cortex 🚀</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}